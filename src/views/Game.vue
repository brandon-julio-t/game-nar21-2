<template>
  <canvas id="game" ref="gameCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

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

      preparePlayerInputListener(player);
      doAnimation(ctx, player);
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

      case "Space":
        player.shoot();
        break;

      case "Escape":
        (async () => {
          const { default: router } = await (() => import("../router"))();
          router.push("/");
        })();
        break;
    }
  }
}

function doAnimation(ctx: any, player: Player): void {
  function animationLoop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    player.moveAndDraw(ctx);

    store.bullets.forEach((bullet: any) => bullet.move());
    store.bullets = store.bullets.filter(
      (bullet: any) => !bullet.isOutOfBounds
    );

    requestAnimationFrame(animationLoop);
  }

  requestAnimationFrame(animationLoop);
}
</script>
