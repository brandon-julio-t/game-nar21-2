import CanDraw from "../interfaces/can-draw";
import Vector2 from "./vector2";
import {
  hexToRgb,
  randomHexColors as randomHexColor,
  randomIntegerBetween
} from "./utilities";
import CanMove from "../interfaces/can-move";

export default class Star implements CanDraw, CanMove {
  private position: Vector2;
  private velocity: Vector2;
  private opacity: number;
  private color: string;
  private trail: number;

  public constructor(
    x: number,
    y: number,
    xVelocity: number,
    yVelocity: number,
    private radius: number,
    private ctx: OffscreenCanvasRenderingContext2D
  ) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(xVelocity, yVelocity);
    this.opacity = Math.random();
    this.color = randomHexColor();
    this.trail = randomIntegerBetween(5, 10);
  }

  public drawSelf(ctx: OffscreenCanvasRenderingContext2D): void {
    const rgb = hexToRgb(this.color);
    if (rgb !== null) {
      const { opacity, position, radius, trail } = this;
      const { red, green, blue } = rgb;
      const { x, y } = position;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      ctx.shadowBlur = trail;
      ctx.shadowColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
    }
  }

  public move(): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  public wrapIfNecessary(): void {
    const { height, width } = this.ctx.canvas;
    const { position } = this;
    const { x, y } = position;

    const outLeft = x < 0;
    const outRight = x > width;
    const outTop = y < 0;
    const outBottom = y > height;

    if (outLeft) position.x = width;
    if (outRight) position.x = 0;
    if (outTop) position.y = height;
    if (outBottom) position.y = 0;
  }
}
