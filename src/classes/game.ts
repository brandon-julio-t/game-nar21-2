import Bullet from "./abstracts/bullet";
import Enemy from "./enemy";
import Entity from "./abstracts/entity";
import InputSystem from "./core/input-system";
import Meteor from "./meteor";
import Player from "./player";
import router from "@/router";
import store from "@/store";
import { getContext } from "./core/utilities";

export default class Game {
  private static readonly FPS: number = 60;

  private static contexts: {
    bulletsCtx: CanvasRenderingContext2D;
    enemiesCtx: CanvasRenderingContext2D;
    playerCtx: CanvasRenderingContext2D;
  };

  private static enemy: Enemy;
  private static meteor: Meteor;
  private static player: Player;

  private static animationId: number | null = null;

  public static start(
    canvases: {
      bulletsCanvas: HTMLCanvasElement | null;
      enemiesCanvas: HTMLCanvasElement | null;
      playerCanvas: HTMLCanvasElement | null;
    },
    backgroundImage: HTMLImageElement | null
  ): void {
    let contexts = {
      bulletsCtx: getContext(canvases.bulletsCanvas),
      enemiesCtx: getContext(canvases.enemiesCanvas),
      playerCtx: getContext(canvases.playerCanvas)
    };

    if (
      Object.values({ ...canvases, ...contexts }).some(c => c === null) ||
      backgroundImage === null
    ) {
      return;
    }

    store.isGaming = true;
    this.cleanUp();

    Object.values(canvases).forEach(canvas =>
      this.prepareCanvas(canvas as HTMLCanvasElement)
    );

    this.contexts = contexts;

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

        Object.values(this.contexts).forEach(ctx =>
          ctx.clearRect(0, 0, innerWidth, innerHeight)
        );

        this.handleMeteor();
        this.handlePlayerAndEnemy();
        this.handleBullets();
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

  private static handleMeteor(): void {
    if (this.meteor === null) {
      return;
    }

    this.meteor.move();
    this.meteor.drawSelf(this.contexts.bulletsCtx);
    this.meteor.checkCollision();
    if (this.meteor.isOutOfBounds) {
      this.meteor.spawnAgainLater();
    }
  }

  private static handlePlayerAndEnemy(): void {
    [this.player, this.enemy].forEach(entity => {
      if (entity === null) {
        return;
      }

      entity.move();
      entity.drawSelfAndHealthBar(
        entity instanceof Player
          ? this.contexts.playerCtx
          : this.contexts.enemiesCtx
      );
      entity.shoot();
    });
  }

  private static handleBullets(): void {
    this.contexts.bulletsCtx.beginPath();
    this.contexts.bulletsCtx.fillStyle = store.color;

    store.bullets = store.bullets.filter(bullet =>
      this.filterWhileDrawing(bullet as Bullet)
    );

    this.contexts.bulletsCtx.fill();
  }

  private static filterWhileDrawing(bullet: Bullet): boolean {
    if (bullet.isEnded || bullet.isOutOfVerticalBounds) {
      return false;
    }

    bullet.move();
    bullet.draw(this.contexts.bulletsCtx);
    bullet.checkCollision();

    return true;
  }

  private static cleanUp(): void {
    store.bullets.splice(0);

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
