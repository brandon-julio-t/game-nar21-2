import Enemy from "./enemy";
import Player from "./player";
import router from "@/router";
import store from "@/store";
import Bullet from "./abstracts/bullet";
import Meteor from "./meteor";
import InputSystem from "./input-system";
import SoundManager from "./sound-manager";

export default class Game {
  private static readonly FPS: number = 60;

  private static ctx: CanvasRenderingContext2D;
  private static enemy: Enemy | null = null;
  private static player: Player | null = null;
  private static meteor: Meteor | null = null;

  private static animationId: number | null = null;

  public static start(
    canvas: HTMLCanvasElement | null,
    backgroundImage: HTMLImageElement | null
  ): void {
    let ctx = null;
    if (canvas === null || (ctx = canvas.getContext("2d")) === null) {
      return;
    }

    if (backgroundImage !== null) {
      backgroundImage.src = store.assets.backgroundImage.src;
    }

    store.isGaming = true;
    this.cleanUp();

    this.prepareCanvas(canvas);
    this.ctx = ctx;

    this.chooseInputSystem();
    this.play();

    const soundManager:SoundManager = SoundManager.getInstance();
    soundManager.playBackgroundMusic();
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
      this.animationId = requestAnimationFrame(loop);

      if (this.loading) {
        return;
      }

      if (this.enemy === null) {
        this.enemy = store.enemy = this.prepareEnemy();
      }

      if (this.meteor === null) {
        this.meteor = new Meteor();
      }

      if (this.player === null) {
        this.player = store.player = this.preparePlayer();
      }

      if (this.enemy.isDead || this.player.isDead) {
        alert("Game Over. Thank you for playing.");
        const soundManager:SoundManager = SoundManager.getInstance();
        soundManager.stopBackgroundMusic();
        router.push("/about");
        return;
      }

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
    if (this.meteor === null) {
      return;
    }

    this.meteor.move();
    this.meteor.drawSelf(this.ctx);
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

    this.enemy = store.enemy = null;
    this.meteor = null;
    this.player = store.player = null;

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
