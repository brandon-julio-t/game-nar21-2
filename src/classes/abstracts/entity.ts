export default abstract class Entity {
  public readonly HEIGHT: number | null = null;
  public readonly WIDTH: number | null = null;

  public get isDead(): boolean {
    return false;
  }

  public set isDead(_: boolean) {}

  public abstract shoot(): void;
}
