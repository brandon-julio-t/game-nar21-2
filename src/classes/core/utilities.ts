import store from "@/store";
import PowerUp from "../abstracts/power-up";
import PowerUpBullet from "../power-up-bullet";
import PowerUpHealth from "../power-up-health";

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

export function loadImage(
  assetName: string,
  isDummy: boolean = false
): HTMLImageElement {
  const image: HTMLImageElement = new Image();

  if (isDummy) {
    return image;
  }

  image.src = asset(`images/${assetName}`);
  image.onload = () => store.loadedAssetsCount++;
  image.onerror = e => {
    console.error(assetName);
    console.error(e);
  };

  return image;
}

export function loadAudio(
  assetName: string,
  isDummy: boolean = false
): HTMLAudioElement {
  const audio: HTMLAudioElement = new Audio();

  if (isDummy) {
    return audio;
  }

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

export function playBgm(level: number) {
  const { backgroundMusic1, backgroundMusic2, backgroundMusic3 } = store.assets;
  const bgms: HTMLAudioElement[] = [
    backgroundMusic1,
    backgroundMusic2,
    backgroundMusic3
  ];

  for (let i = 0; i < bgms.length; i++) {
    const bgm: HTMLAudioElement = bgms[i];
    const lvl: number = i + 1;

    if (lvl === level && bgm.paused) {
      const prevBgm: HTMLAudioElement = bgms[i - 1];

      bgm.currentTime = i > 0 ? prevBgm.currentTime + 1 : bgm.currentTime;
      bgm.play();
    } else if (lvl !== level && !bgm.paused) {
      bgm.pause();
    }
  }
}

export function randomPowerUp(): typeof PowerUp {
  let powerUps: typeof PowerUp[] = [PowerUpBullet, PowerUpHealth];

  const { player } = store;
  if (player !== null && player.bulletLevel > 1) {
    return PowerUpHealth;
  }

  return powerUps[randomIntegerBetween(0, powerUps.length - 1)];
}
