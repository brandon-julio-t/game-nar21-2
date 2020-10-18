import {
  randomColor as randomHexColor,
  randomIntegerBetween
} from "@/classes/core/utilities";
import CanDraw from "@/classes/interfaces/can-draw";

class Star implements CanDraw {
  private readonly COLOR: string = randomHexColor();
  private readonly OPACITY_CHANGE_RATIO: number =
    randomIntegerBetween(1, 5) / 100;
  private readonly X: number = randomIntegerBetween(0, innerWidth);
  private readonly Y: number = randomIntegerBetween(0, innerHeight);

  private isLightening: boolean = randomIntegerBetween(0, 1) === 1;
  private opacity: number = randomIntegerBetween(0, 10) / 10;

  private getRGBColor(): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.COLOR);

    if (result === null) {
      return "";
    }

    const { r, g, b } = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };

    return `rgb(${r}, ${g}, ${b}, ${this.opacity})`;
  }

  public drawSelf(ctx: CanvasRenderingContext2D): void {
    const { X, Y } = this;
    ctx.beginPath();
    ctx.fillStyle = this.getRGBColor();
    ctx.arc(X, Y, 2, 0, Math.PI * 2);
    ctx.fill();

    this.nextOpacity();
  }

  private nextOpacity(): void {
    this.opacity =
      this.opacity + this.OPACITY_CHANGE_RATIO * (this.isLightening ? 1 : -1);

    if (this.opacity <= 0 || this.opacity >= 1) {
      this.isLightening = !this.isLightening;
    }
  }
}

const MAX_STARS: number = innerWidth / 2;
const STARS: Star[] = [];

let lastFrameTime: number = Date.now();

export default function(canvas: HTMLCanvasElement): void {
  const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (ctx === null) {
    return;
  }

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  for (let i = 0; i < MAX_STARS; i++) {
    STARS.push(new Star());
  }

  function animate() {
    if (ctx === null) {
      return;
    }

    const FPSInterval: number = 1000 / 60;
    const now = Date.now();
    const delta = now - lastFrameTime;

    if (delta >= FPSInterval) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      STARS.forEach(star => star.drawSelf(ctx));
      lastFrameTime = now - (delta % FPSInterval);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
