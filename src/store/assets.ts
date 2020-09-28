import store from ".";
import { asset } from "@/classes/core/utilities";

export function loadBackgroundImage(): HTMLImageElement {
  return loadImage("background.jpg");
}

export function loadBackgroundMusic(): HTMLAudioElement {
  return loadAudio("backsound.mp3");
}

export function loadEnemyBullet(): HTMLImageElement {
  return loadImage("sprite-enemy-bullet.png");
}

export function loadExplodeAnimation(): HTMLImageElement {
  return loadImage("explode-sprite.png");
}

export function loadEnemy(): HTMLImageElement {
  return loadImage("sprite-enemy.png");
}

export function loadMeteor(): HTMLImageElement {
  return loadImage("meteor.svg");
}

export function loadPlayer(): HTMLImageElement {
  return loadImage("sprite-player.png");
}

export function loadReversedEnemy(): HTMLImageElement {
  return loadImage("sprite-enemy-reversed.png");
}

export function loadShootingAudio(): HTMLAudioElement {
  return loadAudio("player-shoot.ogg");
}

function loadImage(assetName: string): HTMLImageElement {
  const image: HTMLImageElement = new Image();
  image.src = asset(assetName);
  image.onload = () => store.loadedAssetsCount++;
  image.onerror = e => console.error(e);
  return image;
}

function loadAudio(assetName: string): HTMLAudioElement {
  const audio: HTMLAudioElement = new Audio();
  audio.src = asset(assetName);
  audio.onloadeddata = () => store.loadedAssetsCount++;
  audio.onerror = e => console.error(e);
  return audio;
}
