import store from ".";
import { asset } from "@/classes/core/utilities";

export function loadBackgroundImage(): HTMLImageElement {
  const img: HTMLImageElement = new Image();
  img.src = asset("background.jpg");
  img.onload = () => store.loadedAssetsCount++;
  img.onerror = e => console.error(e);
  return img;
}

export function loadBackgroundMusic(): HTMLAudioElement {
  const audio: HTMLAudioElement = new Audio();
  audio.src = asset("backsound.mp3");
  audio.onloadeddata = () => store.loadedAssetsCount++;
  audio.onerror = e => console.error(e);
  return audio;
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

export function loadShootingAudio(): HTMLAudioElement {
  const audio: HTMLAudioElement = new Audio();
  audio.src = asset("player-shoot.wav");
  audio.onloadeddata = () => store.loadedAssetsCount++;
  audio.onerror = e => console.error(e);
  return audio;
}
