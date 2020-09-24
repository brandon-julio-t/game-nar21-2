<template>
  <canvas id="game" ref="gameCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Game from "@/classes/game";

export default defineComponent({
  setup() {
    const gameCanvas = ref(null); // Don't give type, TypeScript will yell.

    onMounted(() => Game.start(gameCanvas.value)); // Entry point A.K.A. main
    onUnmounted(() => Game.end());

    return { gameCanvas };
  }
});

function prepareCanvas(gameCanvas: any): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = gameCanvas.value;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  return canvas;
}

function preparePlayer(): Player {
  const x: number = innerWidth / 2;
  const y: number = (innerHeight * 3) / 4;
  const velocity: number = 10;
  const player: Player = new Player(x, y, velocity);
  return player;
}

function prepareEnemy(): Enemy {
  const enemy: Enemy = new Enemy(100);
  return enemy;
}

function preparePlayerInputListener(player: Player): void {
  onkeydown = e => inputListener(e, true);
  onkeyup = e => inputListener(e, false);

  function inputListener(e: KeyboardEvent, keyDown: boolean) {
    switch (e.code) {
      case "ArrowUp":
      case "KeyW":
        player.isMovingUp = keyDown;
        break;

      case "ArrowDown":
      case "KeyS":
        player.isMovingDown = keyDown;
        break;

      case "ArrowLeft":
      case "KeyA":
        player.isMovingLeft = keyDown;
        break;

      case "ArrowRight":
      case "KeyD":
        player.isMovingRight = keyDown;
        break;

      case "ShiftLeft":
        player.isSlowingDown = keyDown;
        break;

      // Reserved for future in case RecSel wants manual shooting.
      // case "Space":
      //   if (keyDown) {
      //     player.shoot();
      //   }
      //   break;

      case "Escape":
        router.push("/");
        break;
    }
  }
}

function doAnimation(
  ctx: CanvasRenderingContext2D,
  player: Player,
  enemy: Enemy
): void {
  function animationLoop() {
    if (enemy.isDead || player.isDead) {
      alert("Game Over. Thank you for playing.");
      router.push("/about");
      return;
    }

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.drawImage(bgImg, 0, 0, window.innerWidth, window.innerHeight);

    handlePlayer(ctx, player);
    handleEnemy(ctx, enemy);
    handleBullets(ctx);

    animationId = requestAnimationFrame(animationLoop);
  }

  animationId = requestAnimationFrame(animationLoop);
}

function handlePlayer(ctx: CanvasRenderingContext2D, player: Player) {
  player.moveAndDraw(ctx);
  player.shoot();
}

function handleEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy): void {
  enemy.drawSelfAndHealthBar(ctx);
  enemy.shoot();
}

function handleBullets(ctx: CanvasRenderingContext2D) {
  store.bullets.forEach(bullet => {
    bullet.move();
    bullet.draw(ctx);
    bullet.checkCollision();

    if (bullet instanceof EnemyBullet) {
      bullet.wrapHorizontal();
    }
  });

  store.bullets = store.bullets.filter(
    bullet => !bullet.isEnded && !bullet.isOutOfBounds
  );
}

function cleanUp() {
  store.bullets.splice(0);

  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}
</script>
