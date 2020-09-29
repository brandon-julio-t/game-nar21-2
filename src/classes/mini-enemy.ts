import store from "@/store";
import Entity from "./abstracts/entity";
import { randomIntegerBetween } from "./core/utilities";
import EnemyBullet from "./enemy-bullet";

export default class MiniEnemy extends Entity {
  private static readonly ENEMY_SPRITE_COLS: number = 4;
  private static readonly ENEMY_SPRITE_ROWS: number = 4;

  private readonly SPRITE_COL_CHANGE_TIME = 500; // ENEMY_SPRITE_COLS + 1 every x miliseconds

  private moveTimeoutId: number | null = null;
  private nextTimeToChangeSpriteCol: number = Date.now();
  private nextTimeToShoot: number = Date.now();
  private spriteColIdx: number = 0;

  public constructor() {
    super(
      randomIntegerBetween(0, innerWidth),
      0,
      1,
      store.assets.miniEnemy,
      0,
      store.assets.miniEnemy.naturalHeight / MiniEnemy.ENEMY_SPRITE_ROWS,
      store.assets.miniEnemy.naturalWidth / MiniEnemy.ENEMY_SPRITE_COLS,
      randomIntegerBetween(1, 3)
    );
  }

  protected drawSelf(ctx: CanvasRenderingContext2D): void {
    const { naturalHeight, naturalWidth } = this.sprite;

    const spriteHeight: number = naturalHeight / MiniEnemy.ENEMY_SPRITE_ROWS;
    const spriteWidth: number = naturalWidth / MiniEnemy.ENEMY_SPRITE_COLS;

    const { x, y } = this.position;

    ctx.drawImage(
      this.sprite,
      this.spriteColIdx * spriteWidth,
      0, // Only using the first row of the sprite
      spriteWidth,
      spriteHeight,
      x,
      y,
      spriteWidth,
      spriteHeight
    );

    if (Date.now() >= this.nextTimeToChangeSpriteCol) {
      this.spriteColIdx++;
      this.spriteColIdx %= MiniEnemy.ENEMY_SPRITE_COLS;

      this.nextTimeToChangeSpriteCol = Date.now() + this.SPRITE_COL_CHANGE_TIME;
    }
  }

  protected drawHealthBar(_: CanvasRenderingContext2D): void {}

  public move(): void {
    this.position.y += this.velocity;

    if (this.moveTimeoutId === null) {
      this.moveTimeoutId = setTimeout(() => {
        this._velocity = 0;
        this.moveTimeoutId = null;
      }, 3000);
    }
  }

  public shoot(): void {
    const { x, y } = this.position;

    if (Date.now() >= this.nextTimeToShoot && !this.isDead) {
      store.bullets.splice(0, 0, new EnemyBullet(x, y));

      this.nextTimeToShoot = Date.now() + 1000;
    }
  }
}
