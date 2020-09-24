import Enemy from "./enemy";
import EnemyBullet from "./enemy-bullet";
import Player from "./player";
import router from "@/router";
import store from "@/store";

export default class Game {
  private static ctx: CanvasRenderingContext2D;
  private static player: Player;
  private static enemy: Enemy;

  private static animationId: number | null = null;

  public static start(canvas: HTMLCanvasElement | null): void {
    let ctx = null;
    if (canvas === null || (ctx = canvas.getContext("2d")) === null) {
      return;
    }

    store.isGaming = true;
    this.cleanUp();

    this.ctx = ctx;
    this.player = store.player = this.preparePlayer();
    this.enemy = store.enemy = this.prepareEnemy();
    this.prepareCanvas(canvas);
    // this.prepareKeyboardInputListener();
    this.prepareMouseInputListener();

    this.play();
  }

  public static end(): void {
    store.isGaming = false;
    this.cleanUp();
  }

  private static prepareCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }

  private static preparePlayer(): Player {
    const x: number = innerWidth / 2;
    const y: number = (innerHeight * 3) / 4;
    const velocity: number = 10;

    const player: Player = new Player(x, y, velocity);
    return player;
  }

  private static prepareEnemy(): Enemy {
    const health: number = 100;

    const enemy: Enemy = new Enemy(health);
    return enemy;
  }

  private static prepareMouseInputListener(): void {
    onmousemove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      this.player.position.x = clientX;
      this.player.position.y = clientY;
    };
  }

  private static prepareKeyboardInputListener(): void {
    onkeydown = e => this.inputListener(e, true);
    onkeyup = e => this.inputListener(e, false);
  }

  private static inputListener(e: KeyboardEvent, keyDown: boolean): void {
    switch (e.code) {
      case "ArrowUp":
      case "KeyW":
        this.player.isMovingUp = keyDown;
        break;

      case "ArrowDown":
      case "KeyS":
        this.player.isMovingDown = keyDown;
        break;

      case "ArrowLeft":
      case "KeyA":
        this.player.isMovingLeft = keyDown;
        break;

      case "ArrowRight":
      case "KeyD":
        this.player.isMovingRight = keyDown;
        break;

      case "ShiftLeft":
        this.player.isSlowingDown = keyDown;
        break;

      // Reserved for future in case RecSel wants manual shooting.
      // case "Space":
      //   if (keyDown) {
      //     this.player.shoot();
      //   }
      //   break;

      case "Escape":
        router.push("/");
        break;
    }
  }

  private static play(): void {
    const loop = () => {
      if (this.enemy.isDead || this.player.isDead) {
        alert("Game Over. Thank you for playing.");
        router.push("/about");
        return;
      }

      this.ctx.clearRect(0, 0, innerWidth, innerHeight);

      this.handlePlayer();
      this.handleEnemy();
      this.handleBullets();

      this.animationId = requestAnimationFrame(loop);
    };

    this.animationId = requestAnimationFrame(loop);
  }

  private static handlePlayer(): void {
    this.player.moveAndDraw(this.ctx);
    this.player.shoot();
  }

  private static handleEnemy(): void {
    this.enemy.drawSelfAndHealthBar(this.ctx);
    this.enemy.shoot();
  }

  private static handleBullets(): void {
    store.bullets.forEach(bullet => {
      bullet.move();
      bullet.draw(this.ctx);
      bullet.checkCollision();

      if (bullet instanceof EnemyBullet) {
        bullet.wrapHorizontal();
      }
    });

    store.bullets = store.bullets.filter(
      bullet => !bullet.isEnded && !bullet.isOutOfBounds
    );
  }

  private static cleanUp(): void {
    store.bullets.splice(0);

    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
