<template>
  <canvas id="game" ref="gameCanvas" height="100vh" width="100vw"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import store from "../store";

import Player from "../models/Player";

export default defineComponent({
  setup() {
    const gameCanvas = ref<HTMLCanvasElement>(null);

    onMounted(() => {
      store.isGaming = true;

      const canvas: HTMLCanvasElement = prepareCanvas(gameCanvas);
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      const player: Player = preparePlayer();

      preparePlayerInputListener(player);

      function animationLoop() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        player.draw(ctx);

        requestAnimationFrame(animationLoop);
      }

      requestAnimationFrame(animationLoop);
    });

    onUnmounted(() => {
      store.isGaming = false;
    });

    return {
      gameCanvas
    };
  }
});

function prepareCanvas(gameCanvas): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = gameCanvas.value;
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  return canvas;
}

function preparePlayer(): Player {
  const x: number = innerWidth / 2;
  const y: number = innerHeight / 2;
  const player: Player = new Player(x, y, 50);
  return player;
}

function preparePlayerInputListener(player: Player) {
  addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
        player.moveUp();
        break;
      case "KeyA":
        player.moveLeft();
        break;
      case "KeyS":
        player.moveDown();
        break;
      case "KeyD":
        player.moveRight();
        break;
    }
  });
}
</script>
