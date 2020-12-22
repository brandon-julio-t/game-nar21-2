import { getContext, playBgm } from "./core/utilities";

import CanvasesGroup from "./interfaces/canvases-group";
import ContextsGroup from "./interfaces/contexts-group";
import EnemyBoss from "./enemy-boss";
import EnemyMini from "./enemy-mini";
import Entity from "./abstracts/entity";
import InputSystem from "./core/input-system";
import Meteor from "./meteor";
import Player from "./player";
import store from "@/store";
import router from "@/router";

export default class Game {
  private static readonly FPS: number = 60;
  private static readonly MINI_ENEMY_SPAWN_TIME = 2500; // 1 enemy per 3 seconds
  private static readonly DEFAULT_BG_COUNTER_INCREMENTER: number = 7;

  private static contextsGroup: ContextsGroup;
  private static enemy: EnemyBoss;
  private static meteor: Meteor;
  private static nextTimeToSpawnMiniEnemy: number = Date.now();
  private static player: Player;
  private static bgCounter: number = 0;
  private static bgCounterIncrementer: number;
  private static bgCounterIncrementerChangeTimeoutId: number | null = null;

  private static animationId: number | null = null;

  public static get loading(): boolean {
    return store.loadedAssetsCount < Object.keys(store.assets).length;
  }

  public static start(
    canvasesGroup: CanvasesGroup,
    backgroundImage: HTMLImageElement | null
  ): void {
    Object.values(canvasesGroup).forEach(canvas => this.prepareCanvas(canvas));

    const contexts: ContextsGroup = {
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

    backgroundImage.style.backgroundImage = `url("${store.assets.backgroundImage.src}")`;

    this.contextsGroup = contexts;
    this.enemy = store.enemy = new EnemyBoss();
    this.meteor = new Meteor();
    this.player = store.player = this.preparePlayer();
    this.bgCounterIncrementer = this.DEFAULT_BG_COUNTER_INCREMENTER;
    this.prepareBackgroundMusic();

    this.play();
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

    store.gameOver = store.hasPressedOk = store.player = store.enemy = null;
    store.enemiesKilledCount = 0;

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (store.gameBackground) {
      store.gameBackground.style.position = "0px 0px";
    }

    this.bgCounter = 0;
    this.bgCounterIncrementer = this.DEFAULT_BG_COUNTER_INCREMENTER;
    this.bgCounterIncrementerChangeTimeoutId = null;
  }

  private static prepareCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  private static preparePlayer(): Player {
    const xMid: number = innerWidth / 2;
    const yBottom: number = (innerHeight * 3) / 4;
    return new Player(xMid, yBottom);
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

      if (store.gameBackground) {
        if (store.enemy?.isDead && !this.bgCounterIncrementerChangeTimeoutId) {
          this.bgCounterIncrementerChangeTimeoutId = setTimeout(
            () => (this.bgCounterIncrementer = -40),
            2000
          );
        }

        const position = this.bgCounter;
        this.bgCounter -= this.bgCounterIncrementer;
        store.gameBackground.style.backgroundPosition = `0px ${position}px`;
      }

      if (this.loading) {
        return;
      }

      const now: number = Date.now();
      const delta: number = now - lastFrameTime;

      if (delta > FPSInterval) {
        lastFrameTime = now - (delta % FPSInterval);

        Object.values(this.contextsGroup).forEach(ctx =>
          ctx.clearRect(0, 0, innerWidth, innerHeight)
        );

        if (this.enemy.isDead || this.player.isDead) {
          this.gameOver();
        }

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

    if (entity === this.enemy)
      store.miniEnemies.forEach(e => e.reduceHealth(Number.MAX_SAFE_INTEGER));

    InputSystem.reset();

    if (this.player.isDead) {
      this.enemy.win(
        () => router.push("/about"),
        this.contextsGroup.enemiesCtx
      );
    } else if (this.enemy.isDead) {
      this.player.win(() => router.push("/about"));
    }

    if (entity.hasFinishedDying) {
      store.gameOver = true;
    }
  }

  private static handlePlayerAndEnemy(): void {
    [this.player, this.enemy, ...store.miniEnemies].forEach(entity => {
      if (entity === null) {
        return;
      }

      const ctx: OffscreenCanvasRenderingContext2D =
        entity instanceof Player
          ? this.contextsGroup.playerCtx
          : this.contextsGroup.enemiesCtx;

      entity.move();
      entity.drawSelfAndHealthBar(ctx);
      entity.shoot();
    });
  }

  private static handleMiniEnemy(): void {
    if (this.player?.isDead) return;

    const timeToSpawn = Date.now() >= this.nextTimeToSpawnMiniEnemy;
    const spawnedEnemiesAreLessThanSeven = store.miniEnemies.length < 7;

    if (
      spawnedEnemiesAreLessThanSeven &&
      timeToSpawn &&
      !store.enemy?.isEntering &&
      !this.enemy.isDead
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
