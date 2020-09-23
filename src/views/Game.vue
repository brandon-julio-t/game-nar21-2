<template>
  <canvas id="game" ref="gameCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Enemy from "@/models/Enemy";
import Player from "@/models/Player";
import store from "@/store";

export default defineComponent({
  setup() {
    const gameCanvas = ref(null); // Don't give type, TypeScript will yell.

    /**
     * Entry point A.K.A. main
     */
    onMounted(() => {
      store.isGaming = true;

      const canvas = prepareCanvas(gameCanvas); // Don't give type, TypeScript will yell.
      const ctx = canvas.getContext("2d"); // Don't give type, TypeScript will yell.
      const player: Player = preparePlayer();
      const enemy: Enemy = (store.enemy = prepareEnemy());

      preparePlayerInputListener(player);
      doAnimation(ctx, player, enemy);
    });

    onUnmounted(() => {
      store.isGaming = false;
    });

    return {
      gameCanvas
    };
  }
});

function prepareCanvas(gameCanvas: any): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = gameCanvas.value;
  canvas.height = innerHeight;
  canvas.width = innerWidth;
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
        backToIndex();
        break;
    }
  }
}

function backToIndex() {
  (async () => {
    const { default: router } = await (() => import("../router"))();
    router.push("/");
  })();
}

function doAnimation(ctx: any, player: Player, enemy: Enemy): void {
  function animationLoop() {
    if (enemy.isDead) {
      backToIndex();
    }

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    player.moveAndDraw(ctx);
    player.shoot();

    enemy.drawSelfAndHealthBar(ctx);

    store.bullets.forEach((bullet: any) => {
      bullet.move();
      bullet.draw(ctx);
      bullet.checkCollisionWithEnemy();
    });

    store.bullets = store.bullets.filter(
      (bullet: any) => !bullet.isOutOfBounds && !bullet.isEnded
    );

    requestAnimationFrame(animationLoop);
  }

  requestAnimationFrame(animationLoop);
}
</script>
