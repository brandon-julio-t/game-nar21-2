import Point from "@/classes/core/Point";
import Snake from "@/classes/core/Snake";
import { randomIntegerBetween } from "@/classes/core/utilities";

export default class SLake {
  private ctx: OffscreenCanvasRenderingContext2D;

  private maxSnakesCount = Math.floor(innerWidth / 100);
  private points: Point[][] = [];
  private snakes: Snake[] = [];
  private animationFrameId: number = -1;

  public constructor(public canvas: OffscreenCanvas) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    this.ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

    const rowGapRatio = innerHeight / 20;
    const colGapRatio = innerWidth / 40;

    for (
      let row = -rowGapRatio;
      row < canvas.height + rowGapRatio;
      row += rowGapRatio
    ) {
      const rowPoints = [];

      for (
        let col = -colGapRatio;
        col < canvas.width + colGapRatio;
        col += colGapRatio
      ) {
        rowPoints.push(new Point(col, row));
      }

      this.points.push(rowPoints);
    }

    const loop = () => {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      if (this.snakes.length < this.maxSnakesCount) {
        const randRowIdx = randomIntegerBetween(0, this.points.length - 1);
        const randColIdx = randomIntegerBetween(
          0,
          this.points[randRowIdx].length - 1
        );
        this.snakes.push(new Snake(randRowIdx, randColIdx));
      }

      this.snakes.forEach((snake, idx) => {
        const currPoint = this.points[snake.rowIdx][snake.colIdx];

        snake.next();
        if (this.snakeIsOutOfBounds(snake)) {
          this.snakes[idx] = this.snakes[this.snakes.length - 1];
          this.snakes.pop();
          return;
        }

        const nextPoint = this.points[snake.rowIdx][snake.colIdx];
        this.ctx.strokeStyle = snake.color;
        this.ctx.beginPath();
        this.ctx.moveTo(currPoint.x, currPoint.y);
        this.ctx.lineTo(nextPoint.x, nextPoint.y);
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
      });

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  public cleanUp(): void {
    this.points = [];
    this.snakes = [];
    cancelAnimationFrame(this.animationFrameId);
  }

  private snakeIsOutOfBounds(snake: Snake): boolean {
    return (
      snake.rowIdx < 0 ||
      snake.colIdx < 0 ||
      snake.rowIdx >= this.points.length ||
      snake.colIdx >= this.points[snake.rowIdx].length
    );
  }
}
