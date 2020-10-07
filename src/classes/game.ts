import EnemyBoss from "./enemy-boss";
import Entity from "./abstracts/entity";
import InputSystem from "./core/input-system";
import Meteor from "./meteor";
import Player from "./player";
import router from "@/router";
import store from "@/store";
import { getContext, playBgm } from "./core/utilities";
import CanvasesGroup from "./interfaces/canvases-group";
import ContextsGroup from "./interfaces/contexts-group";
import EnemyMini from "./enemy-mini";
import Environment from "./core/environment";

export default class Game {
  private static readonly FPS: number = 60;
  private static readonly MINI_ENEMY_SPAWN_TIME = 2500; // 1 enemy per 3 seconds

  private static contextsGroup: ContextsGroup;
  private static enemy: EnemyBoss;
  private static meteor: Meteor;
  private static nextTimeToSpawnMiniEnemy: number = Date.now();
  private static player: Player;

  private static animationId: number | null = null;

  public static start(
    canvasesGroup: CanvasesGroup,
    backgroundImage: HTMLImageElement | null
  ): void {
    let contexts: ContextsGroup = {
      bulletsCtx: getContext(canvasesGroup.bulletsCanvas),
      enemiesCtx: getContext(canvasesGroup.enemiesCanvas),
      playerCtx: getContext(canvasesGroup.playerCanvas)
    };

    if (
      Object.values({ ...canvasesGroup, ...contexts }).some(c => c === null) ||
      backgroundImage === null
    ) {
      return;
    }

    store.isGaming = true;
    this.cleanUp();

    Object.values(canvasesGroup).forEach(canvas =>
      this.prepareCanvas(canvas as HTMLCanvasElement)
    );

    backgroundImage.style.backgroundImage = `url("${store.assets.backgroundImage.src}")`;

    this.contextsGroup = contexts;
    this.enemy = store.enemy = new EnemyBoss();
    this.meteor = new Meteor();
    this.player = store.player = this.preparePlayer();
    this.prepareBackgroundMusic();

    this.play();
  }

  public static get loading(): boolean {
    return store.loadedAssetsCount < Object.keys(store.assets).length;
  }

  public static end(): void {
    store.isGaming = false;
    this.cleanUp();
  }

  private static cleanUp(): void {
    const { assets, bullets, miniEnemies } = store;
    const { backgroundMusic1, backgroundMusic2, backgroundMusic3 } = assets;

    [bullets, miniEnemies].forEach(e => e.splice(0));
    [backgroundMusic1, backgroundMusic2, backgroundMusic3].forEach(bgm =>
      bgm.pause()
    );

    store.player = store.enemy = null;
    store.enemiesKilledCount = 0;

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private static prepareCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  private static preparePlayer(): Player {
    const x: number = innerWidth / 2;
    const y: number = (innerHeight * 3) / 4;
    return new Player(x, y);
  }

  private static prepareBackgroundMusic(): void {
    const {
      backgroundMusic1,
      backgroundMusic2,
      backgroundMusic3
    } = store.assets;

    backgroundMusic1.currentTime = backgroundMusic2.currentTime = backgroundMusic3.currentTime = 0;
    backgroundMusic1.loop = backgroundMusic2.loop = backgroundMusic3.loop = true;

    playBgm(1);
  }

  private static play(): void {
    const FPSInterval: number = 1000 / Game.FPS;
    let lastFrameTime: number = Date.now();

    const loop = () => {
      this.animationId = requestAnimationFrame(loop);

      if (this.loading) {
        return;
      }

      const now: number = Date.now();
      const delta: number = now - lastFrameTime;

      if (delta > FPSInterval) {
        if (this.enemy.isDead || this.player.isDead) {
          this.gameOver();
        }

        lastFrameTime = now - (delta % FPSInterval);

        Object.values(this.contextsGroup).forEach(ctx =>
          ctx.clearRect(0, 0, innerWidth, innerHeight)
        );

        this.handlePlayerAndEnemy();
        this.handleMiniEnemy();
        this.handlePowerUps();
        this.handleBullets();
        this.handleMeteor();
      }
    };

    this.animationId = requestAnimationFrame(loop);
  }

  private static gameOver(): void {
    const entity: Entity = this.enemy.isDead ? this.enemy : this.player;

    InputSystem.reset();

    if (entity.hasFinishedDying) {
      router.push("/about");
    }
  }

  private static handlePlayerAndEnemy(): void {
    [this.player, this.enemy, ...store.miniEnemies].forEach(entity => {
      if (entity === null) {
        return;
      }

      const ctx: CanvasRenderingContext2D =
        entity instanceof Player
          ? this.contextsGroup.playerCtx
          : this.contextsGroup.enemiesCtx;

      entity.move();
      entity.drawSelfAndHealthBar(ctx);
      entity.shoot();
    });
  }

  private static handleMiniEnemy(): void {
    const timeToSpawn = Date.now() >= this.nextTimeToSpawnMiniEnemy;
    const spawnedEnemiesAreLessThanSeven = store.miniEnemies.length < 7;

    if (
      spawnedEnemiesAreLessThanSeven &&
      timeToSpawn &&
      !store.enemy?.isEntering
    ) {
      store.miniEnemies.push(new EnemyMini());
      this.nextTimeToSpawnMiniEnemy = Date.now() + this.MINI_ENEMY_SPAWN_TIME;
    }

    store.miniEnemies = store.miniEnemies.filter(
      enemy => !(enemy.isDead && enemy.hasFinishedDying)
    );
  }

  private static handlePowerUps(): void {
    store.powerUps.filter(powerUp => {
      if (powerUp.isEnded || powerUp.isOutOfBounds) {
        return false;
      }

      powerUp.move();
      powerUp.drawSelf(this.contextsGroup.bulletsCtx);
      powerUp.checkCollision();

      return true;
    });
  }

  private static handleBullets(): void {
    store.bullets = store.bullets.filter(bullet => {
      if (bullet.isEnded || bullet.isOutOfVerticalBounds) {
        return false;
      }

      bullet.move();
      bullet.drawSelf(this.contextsGroup.bulletsCtx);
      bullet.checkCollision();

      return true;
    });
  }

  private static handleMeteor(): void {
    if (this.meteor === null) {
      return;
    }

    this.meteor.move();
    this.meteor.drawSelf(this.contextsGroup.bulletsCtx);
    this.meteor.checkCollision();

    if (this.meteor.isOutOfBounds) {
      this.meteor.spawnAgainLater();
    }
  }
}
