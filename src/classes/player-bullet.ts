import Bullet from "./abstracts/bullet";
import Enemy from "./enemy";
import store from "@/store";

export default class PlayerBullet extends Bullet {
                 public constructor(x: number, y: number) {
                   super(x, y, 0, -25, 20, 5);
                 }

                 public checkCollision(): void {
                   const enemy: Enemy | null = store.enemy as Enemy;
                   if (enemy !== null) {
                     const { naturalWidth, naturalHeight } = enemy.sprite;
                     const hasCollision: boolean =
                       this.position.x >= enemy.position.x &&
                       this.position.y >= enemy.position.y &&
                       this.position.x <= enemy.position.x + naturalWidth &&
                       this.position.y <= enemy.position.y + naturalHeight;

                     if (hasCollision) {
                       this.isEnded = true;
                       enemy.reduceHealth(1);
                     }
                   }
                 }
               }
