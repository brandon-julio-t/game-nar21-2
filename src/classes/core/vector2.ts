export default class Vector2 {
  public x: number;
  public y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public normalized(): Vector2 {
    const { x, y } = this;
    const unit: number = Math.sqrt(x * x + y * y);
    return new Vector2(x / unit, y / unit);
  }
}
