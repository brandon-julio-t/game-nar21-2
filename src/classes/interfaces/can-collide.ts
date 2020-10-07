import Player from '../player';

export default interface CanCollide {
  checkCollision(): void;
  onCollide(): void;
}
