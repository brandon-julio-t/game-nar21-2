import store from ".";
import { asset } from "@/classes/core/utilities";

enum Assets {
  BACKGROUND = "background.jpg",
  BACKSOUND = "backsound.mp3",
  EXPLODE_SPRITE = "explode-sprite.png",
  METEOR = "meteor.svg",
  PLAYER_SHOOT = "player-shoot.ogg",
  SPRITE_ENEMY = "sprite-enemy.png",
  SPRITE_ENEMY_BULLET = "sprite-enemy-bullet.png",
  SPRITE_ENEMY_REVERSED = "sprite-enemy-reversed.png",
  SPRITE_MINI_ENEMY = "sprite-mini-enemy.png",
  SPRITE_PLAYER = "sprite-player.png"
}

const {
  BACKGROUND,
  BACKSOUND,
  EXPLODE_SPRITE,
  METEOR,
  PLAYER_SHOOT,
  SPRITE_ENEMY,
  SPRITE_ENEMY_BULLET,
  SPRITE_ENEMY_REVERSED,
  SPRITE_MINI_ENEMY,
  SPRITE_PLAYER
} = Assets;

export default {
  loadBackgroundImage: (): HTMLImageElement => loadImage(BACKGROUND),
  loadBackgroundMusic: (): HTMLAudioElement => loadAudio(BACKSOUND),
  loadEnemy: (): HTMLImageElement => loadImage(SPRITE_ENEMY),
  loadEnemyBullet: (): HTMLImageElement => loadImage(SPRITE_ENEMY_BULLET),
  loadExplodeSprite: (): HTMLImageElement => loadImage(EXPLODE_SPRITE),
  loadMeteor: (): HTMLImageElement => loadImage(METEOR),
  loadMiniEnemy: (): HTMLImageElement => loadImage(SPRITE_MINI_ENEMY),
  loadPlayer: (): HTMLImageElement => loadImage(SPRITE_PLAYER),
  loadReversedEnemy: (): HTMLImageElement => loadImage(SPRITE_ENEMY_REVERSED),
  loadShootingAudio: (): HTMLAudioElement => loadAudio(PLAYER_SHOOT),
};

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
