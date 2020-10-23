import store from "@/store";
import PowerUp from "../abstracts/power-up";
import RGB from "../interfaces/rgb";
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

export function hexToRgb(hex: string): RGB | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
      }
    : null;
}

export function randomHexColors(): string {
  const colors: string[] = [
    "#FFF5F5",
    "#FED7D7",
    "#FEB2B2",
    "#FC8181",
    "#F56565",
    "#E53E3E",
    "#C53030",
    "#9B2C2C",
    "#742A2A",
    "#FFFAF0",
    "#FEEBC8",
    "#FBD38D",
    "#F6AD55",
    "#ED8936",
    "#DD6B20",
    "#C05621",
    "#9C4221",
    "#7B341E",
    "#FFFFF0",
    "#FEFCBF",
    "#FAF089",
    "#F6E05E",
    "#ECC94B",
    "#D69E2E",
    "#B7791F",
    "#975A16",
    "#744210",
    "#F0FFF4",
    "#C6F6D5",
    "#9AE6B4",
    "#68D391",
    "#48BB78",
    "#38A169",
    "#2F855A",
    "#276749",
    "#22543D",
    "#E6FFFA",
    "#B2F5EA",
    "#81E6D9",
    "#4FD1C5",
    "#38B2AC",
    "#319795",
    "#2C7A7B",
    "#285E61",
    "#234E52",
    "#EBF8FF",
    "#BEE3F8",
    "#90CDF4",
    "#63B3ED",
    "#4299E1",
    "#3182CE",
    "#2B6CB0",
    "#2C5282",
    "#2A4365",
    "#EBF4FF",
    "#C3DAFE",
    "#A3BFFA",
    "#7F9CF5",
    "#667EEA",
    "#5A67D8",
    "#4C51BF",
    "#434190",
    "#3C366B",
    "#FAF5FF",
    "#E9D8FD",
    "#D6BCFA",
    "#B794F4",
    "#9F7AEA",
    "#805AD5",
    "#6B46C1",
    "#553C9A",
    "#44337A",
    "#FFF5F7",
    "#FED7E2",
    "#FBB6CE",
    "#F687B3",
    "#ED64A6",
    "#D53F8C",
    "#B83280",
    "#97266D",
    "#702459"
  ];
  return colors[randomIntegerBetween(0, colors.length - 1)];
}
