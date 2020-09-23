<template>
  <canvas id="game" ref="gameCanvas" height="100vh" width="100vw"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Player from "../models/Player";
import router from "../router";
import store from "../store";

export default defineComponent({
  setup() {
    const gameCanvas = ref(null);

    onMounted(() => {
      store.isGaming = true;

      const canvas = prepareCanvas(gameCanvas);
      const ctx = canvas.getContext("2d");
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
  const velocity: number = 50;
  const player: Player = new Player(x, y, velocity);
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
      case "Escape":
        router.push("/");
        break;
    }
  });
}

function doAnimation(ctx: any, player: Player) {
  function animationLoop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    player.draw(ctx);

    requestAnimationFrame(animationLoop);
  }

  requestAnimationFrame(animationLoop);
}
</script>
