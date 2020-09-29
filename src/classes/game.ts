import Bullet from "./abstracts/bullet";
import Enemy from "./enemy";
import Entity from "./abstracts/entity";
import InputSystem from "./core/input-system";
import Meteor from "./meteor";
import Player from "./player";
import router from "@/router";
import store from "@/store";
import { getContext } from "./core/utilities";
import CanvasesGroup from "./interfaces/canvases-group";
import ContextsGroup from "./interfaces/contexts-group";
import MiniEnemy from "./mini-enemy";

export default class Game {
  private static readonly FPS: number = 60;
  private static readonly MINI_ENEMY_SPAWN_TIME = 1000; // 1 enemy per x miliseconds

  private static contextsGroup: ContextsGroup;
  private static enemy: Enemy;
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

    this.contextsGroup = contexts;

    backgroundImage.style.backgroundImage = `url("${store.assets.backgroundImage.src}")`;

    this.enemy = store.enemy = this.prepareEnemy();
    this.meteor = new Meteor();
    this.player = store.player = this.preparePlayer();

    store.assets.backgroundMusic.play();

    this.play();
  }

  public static get loading(): boolean {
    return store.loadedAssetsCount < Object.keys(store.assets).length;
  }

  public static end(): void {
    store.isGaming = false;
    this.cleanUp();
  }

  private static prepareCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  private static play(): void {
    const FPSInterval: number = 1000 / Game.FPS;
    let lastFrameTime: number = Date.now();

    const loop = () => {
      this.animationId = requestAnimationFrame(loop);

      if (this.loading) {
        return;
      }

      if (this.enemy.isDead || this.player.isDead) {
        const entity: Entity = this.enemy.isDead ? this.enemy : this.player;

        if (entity instanceof Player) {
          InputSystem.disable();
          entity.stopMoving();
        }

        if (entity.hasFinishedExploding) {
          router.push("/about");
        }
      }

      const now: number = Date.now();
      const delta: number = now - lastFrameTime;
      if (delta > FPSInterval) {
        lastFrameTime = now - (delta % FPSInterval);

        Object.values(this.contextsGroup).forEach(ctx =>
          ctx.clearRect(0, 0, innerWidth, innerHeight)
        );

        this.handleBullets();
        this.handleMeteor();
        this.handleMiniEnemy();
        this.handlePlayerAndEnemy();
      }
    };

    this.animationId = requestAnimationFrame(loop);
  }

  private static prepareEnemy(): Enemy {
    const health: number = 1500;
    const velocity: number = 2;
    return new Enemy(health, velocity);
  }

  private static preparePlayer(): Player {
    const health: number = 12;
    const velocity: number = 10;
    const x: number = innerWidth / 2;
    const y: number = (innerHeight * 3) / 4;
    return new Player(x, y, velocity, health);
  }

  private static handleBullets(): void {
    this.contextsGroup.bulletsCtx.beginPath();
    this.contextsGroup.bulletsCtx.fillStyle = store.color;

    store.bullets = store.bullets.filter(bullet =>
      this.filterWhileDrawing(bullet as Bullet)
    );

    this.contextsGroup.bulletsCtx.fill();
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

  private static handleMiniEnemy(): void {
    if (Date.now() >= this.nextTimeToSpawnMiniEnemy) {
      store.miniEnemies.push(new MiniEnemy());
      this.nextTimeToSpawnMiniEnemy = Date.now() + this.MINI_ENEMY_SPAWN_TIME;
    }

    store.miniEnemies.forEach(miniEnemy => {
      miniEnemy.move();
      miniEnemy.drawSelfAndHealthBar(this.contextsGroup.enemiesCtx);
      miniEnemy.shoot();
    });
  }

  private static handlePlayerAndEnemy(): void {
    [this.player, this.enemy].forEach(entity => {
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

  private static filterWhileDrawing(bullet: Bullet): boolean {
    if (bullet.isEnded || bullet.isOutOfVerticalBounds) {
      return false;
    }

    bullet.move();
    bullet.draw(this.contextsGroup.bulletsCtx);
    bullet.checkCollision();

    return true;
  }

  private static cleanUp(): void {
    store.bullets.splice(0);
    store.miniEnemies.splice(0);

    store.enemy = null;
    store.player = null;

    store.assets.backgroundMusic.currentTime = 0;
    store.assets.backgroundMusic.pause();

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
