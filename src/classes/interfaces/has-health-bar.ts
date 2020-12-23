export default interface HasHealthBar {
  drawHealthBar(
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  ): void;
}
