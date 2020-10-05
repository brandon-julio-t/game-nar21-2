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
  image.src = asset(`images/${assetName}`);
  image.onload = () => store.loadedAssetsCount++;
  image.onerror = e => {
    console.error(assetName);
    console.error(e);
  };
  return image;
}

export function loadAudio(assetName: string): HTMLAudioElement {
  const audio: HTMLAudioElement = new Audio();
  audio.src = asset(`audio/${assetName}`);
  audio.onloadeddata = () => store.loadedAssetsCount++;
  audio.onerror = e => {
    console.error(assetName);
    console.error(e);
  };
  return audio;
}

export function playAudio(audio: HTMLAudioElement): void {
  audio.currentTime = 0;
  audio.play();
}

export function vectorToRadian(vector: Vector2) {
  return Math.atan2(vector.y, vector.x) + Math.PI / 2;
}

export function radianToVector(angle: number): Vector2 {
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  return new Vector2(x, y);
}
