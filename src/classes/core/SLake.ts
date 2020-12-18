import Point from "@/classes/core/Point";
import Snake from "@/classes/core/Snake";

export default class SLake {
  private ctx: OffscreenCanvasRenderingContext2D;

  private maxSnakesCount = Math.floor(innerWidth / 50); // "The more the merrier" - SL19-2
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

    // this onmousemove will be cleaned by InputSystem
    onmousemove = e => {
      if (this.snakes.length < this.maxSnakesCount) {
        const { clientX, clientY } = e;
        const row = Math.round((clientY / innerHeight) * 20);
        const col = Math.round((clientX / innerWidth) * 40);

        this.snakes.push(new Snake(row + 1, col + 1)); // +1 because row & col starts from negative and ends after limit according to gap ratio
      }
    };

    const FPS = 30;
    const interval = 1000 / FPS;
    let lastFrameTime = Date.now();

    const loop = () => {
      const now = Date.now();
      const delta = now - lastFrameTime;

      if (delta <= interval) {
        this.animationFrameId = requestAnimationFrame(loop);
        return;
      }

      lastFrameTime = now - (lastFrameTime % delta);

      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

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
