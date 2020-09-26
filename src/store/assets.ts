import store from ".";
import { asset } from "@/classes/core/utilities";

export function loadBackgroundImage(): HTMLImageElement {
  const img: HTMLImageElement = new Image();
  img.src = asset("background.jpg");
  img.onload = () => store.loadedAssetsCount++;
  img.onerror = e => console.error(e);
  return img;
}

export function loadEnemyBullet(): HTMLImageElement {
  const img: HTMLImageElement = new Image();
  img.src = asset("sprite-enemy-bullet.png");
  img.onload = () => store.loadedAssetsCount++;
  img.onerror = e => console.error(e);
  return img;
}

export function loadEnemy(): HTMLImageElement {
  const img: HTMLImageElement = new Image();
  img.src = asset("sprite-enemy.png");
  img.onload = () => store.loadedAssetsCount++;
  img.onerror = e => console.error(e);
  return img;
}

export function loadMeteor(): HTMLImageElement {
  const img: HTMLImageElement = new Image();
  img.src = asset("meteor.svg");
  img.onload = () => store.loadedAssetsCount++;
  img.onerror = e => console.error(e);
  return img;
}

export function loadPlayer(): HTMLImageElement {
  const img: HTMLImageElement = new Image();
  img.src = asset("sprite-player.png");
  img.onload = () => store.loadedAssetsCount++;
  img.onerror = e => console.error(e);
  return img;
}

export function loadReversedEnemy(): HTMLImageElement {
  const img: HTMLImageElement = new Image();
  img.src = asset("sprite-enemy-reversed.png");
  img.onload = () => store.loadedAssetsCount++;
  img.onerror = e => console.error(e);
  return img;
}
