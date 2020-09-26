import Enemy from "./enemy";
import EnemyBullet from "./enemy-bullet";
import Player from "./player";
import router from "@/router";
import store from "@/store";
import Bullet from "./abstracts/bullet";
import Meteor from "./meteor";
import InputSystem from "./input-system";

export default class Game {
  private static readonly FPS: number = 60;

  public static readonly TOTAL_ASSETS_COUNT: number = 5;

  private static ctx: CanvasRenderingContext2D;
  private static enemy: Enemy;
  private static player: Player;
  private static meteor: Meteor;

  private static animationId: number | null = null;

  public static start(canvas: HTMLCanvasElement | null): void {
    let ctx = null;
    if (canvas === null || (ctx = canvas.getContext("2d")) === null) {
      return;
    }

    store.isGaming = true;
    this.cleanUp();

    this.prepareCanvas(canvas);
    this.ctx = ctx;

    this.enemy = store.enemy = this.prepareEnemy();
    this.meteor = new Meteor();
    this.player = store.player = this.preparePlayer();

    this.chooseInputSystem();
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

  private static chooseInputSystem(): void {
    confirm("Use keyboard as input? Yes: [ENTER] or No: [ESC]")
      ? InputSystem.useKeyboard()
      : InputSystem.useMouse();
  }

  private static play(): void {
    const FPSInterval: number = 1000 / Game.FPS;
    let lastFrameTime: number = Date.now();

    const loop = () => {
      if (this.loading) {
        return;
      }

      if (this.enemy.isDead || this.player.isDead) {
        alert("Game Over. Thank you for playing.");
        router.push("/about");
        return;
      }

      this.animationId = requestAnimationFrame(loop);

      const now: number = Date.now();
      const delta: number = now - lastFrameTime;
      if (delta > FPSInterval) {
        lastFrameTime = now - (delta % FPSInterval);

        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        this.handleMeteor();
        this.handlePlayerAndEnemy();
        this.handleBullets();
      }
    };

    this.animationId = requestAnimationFrame(loop);
  }

  private static handleMeteor(): void {
    this.meteor.move();
    this.meteor.drawSelf(this.ctx);
    this.meteor.checkCollision();
    if (this.meteor.isOutOfBounds) {
      this.meteor.spawnAgainLater();
    }
  }

  private static handlePlayerAndEnemy(): void {
    [this.player, this.enemy].forEach(entity => {
      entity.move();
      entity.drawSelfAndHealthBar(this.ctx);
      entity.shoot();
    });
  }

  private static handleBullets(): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = store.color;

    store.bullets = store.bullets.filter(bullet =>
      this.filterWhileDrawing(bullet as Bullet)
    );

    this.ctx.fill();
  }

  private static filterWhileDrawing(bullet: Bullet): boolean {
    if (bullet.isEnded || bullet.isOutOfBounds) {
      return false;
    }

    bullet.move();
    bullet.draw(this.ctx);
    bullet.checkCollision();

    return true;
  }

  private static cleanUp(): void {
    store.bullets.splice(0);

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
