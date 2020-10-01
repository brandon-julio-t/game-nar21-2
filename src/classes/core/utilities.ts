import store from "@/store";
import Vector2 from "./vector2";

export function randomIntegerBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function asset(filename: string) {
  return `${process.env.BASE_URL}${filename}`;
}

export function getContext(canvas: HTMLCanvasElement | null) {
  return canvas?.getContext("2d") as CanvasRenderingContext2D;
}

export function degreeToRadian(degree: number) {
  return (Math.PI / 180) * degree;
}

export function loadImage(assetName: string): HTMLImageElement {
  const image: HTMLImageElement = new Image();
  image.src = asset(assetName);
  image.onload = () => store.loadedAssetsCount++;
  image.onerror = e => console.error(e);
  return image;
}

export function loadAudio(assetName: string): HTMLAudioElement {
  const audio: HTMLAudioElement = new Audio();
  audio.src = asset(assetName);
  audio.onloadeddata = () => store.loadedAssetsCount++;
  audio.onerror = e => console.error(e);
  return audio;
}

export function playAudio(audio: HTMLAudioElement): void {
  audio.currentTime = 0;
  audio.play();
}

export function randomMiniEnemySprite(): HTMLImageElement {
  const {
    miniEnemy1,
    miniEnemy2,
    miniEnemy3,
    miniEnemy4,
    miniEnemy5
  } = store.assets;

  const sprites = [miniEnemy1, miniEnemy2, miniEnemy3, miniEnemy4, miniEnemy5];
  return sprites[randomIntegerBetween(0, sprites.length - 1)];
}

export function vectorToRadian(vector: Vector2) {
  return Math.atan2(vector.y, vector.x) + Math.PI / 2;
}

export function radianToVector(angle: number) {
  return { x: Math.cos(angle), y: Math.sin(angle) };
}
