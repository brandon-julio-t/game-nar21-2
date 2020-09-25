export default abstract class Entity {
  public readonly HEIGHT: number = 0;
  public readonly WIDTH: number = 0;

  public get isDead(): boolean {
    return false;
  }

  public set isDead(_: boolean) {}

  public abstract shoot(): void;
}
