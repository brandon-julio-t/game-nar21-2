export default interface CanDraw {
  drawSelf(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void;
}
