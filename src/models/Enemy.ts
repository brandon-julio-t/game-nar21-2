import Vector2 from "./Vector2";

export default class Enemy {
  public readonly WIDTH: number = innerWidth / 2;
  public readonly HEIGHT: number = innerHeight / 4;

  public position: Vector2 = new Vector2(innerWidth / 2 - this.WIDTH / 2, 0);

  private maxHealth: number;
  private currentHealth: number;

  constructor(health: number) {
    this.currentHealth = this.maxHealth = health;
  }

  public reduceHealth(points: number): void {
    this.currentHealth -= points;
  }

  public get isDead(): boolean {
    return this.currentHealth <= 0;
  }

  public drawSelfAndHealthBar(ctx: CanvasRenderingContext2D): void {
    this.drawSelf(ctx);
    this.drawHealthBar(ctx);
  }

  private drawSelf(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.position;
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, this.WIDTH, this.HEIGHT);
  }

  private drawHealthBar(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(
      0,
      0,
      innerWidth * (this.currentHealth / this.maxHealth),
      this.HEIGHT / 4
    );
  }
}
