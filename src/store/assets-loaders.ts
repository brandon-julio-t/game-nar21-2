import { loadAudio, loadImage } from "@/classes/core/utilities";

enum Assets {
  BACKGROUND = "background.png",
  BACKGROUND_MUSIC = "background-music.mp3",
  EXPLODE_SPRITE = "explode-sprite.png",
  METEOR = "meteor.svg",
  PLAYER_GET_HIT = "player-get-hit.ogg",
  PLAYER_LOSE = "player-lose.ogg",
  PLAYER_SHOOT = "player-shoot.ogg",
  SPRITE_ENEMY = "sprite-enemy.png",
  SPRITE_ENEMY_BULLET_CIRCLE = "sprite-enemy-bullet-circle.png",
  SPRITE_ENEMY_BULLET_LASER = "sprite-enemy-bullet-laser.png",
  SPRITE_ENEMY_REVERSED = "sprite-enemy-reversed.png",
  SPRITE_MINI_ENEMY = "sprite-mini-enemy.png",
  SPRITE_PLAYER = "sprite-player.png",
  SPRITE_PLAYER_BULLET = "sprite-player-bullet.png"
}

const {
  BACKGROUND,
  BACKGROUND_MUSIC,
  EXPLODE_SPRITE,
  METEOR,
  PLAYER_GET_HIT,
  PLAYER_LOSE,
  PLAYER_SHOOT,
  SPRITE_ENEMY,
  SPRITE_ENEMY_BULLET_CIRCLE,
  SPRITE_ENEMY_BULLET_LASER,
  SPRITE_ENEMY_REVERSED,
  SPRITE_MINI_ENEMY,
  SPRITE_PLAYER,
  SPRITE_PLAYER_BULLET
} = Assets;

export default {
  loadBackgroundImage: (): HTMLImageElement => loadImage(BACKGROUND),
  loadBackgroundMusic: (): HTMLAudioElement => loadAudio(BACKGROUND_MUSIC),
  loadEnemy: (): HTMLImageElement => loadImage(SPRITE_ENEMY),
  loadEnemyBulletCircle: (): HTMLImageElement =>
    loadImage(SPRITE_ENEMY_BULLET_CIRCLE),
  loadEnemyBulletLaser: (): HTMLImageElement =>
    loadImage(SPRITE_ENEMY_BULLET_LASER),
  loadExplodeSprite: (): HTMLImageElement => loadImage(EXPLODE_SPRITE),
  loadMeteor: (): HTMLImageElement => loadImage(METEOR),
  loadMiniEnemy: (): HTMLImageElement => loadImage(SPRITE_MINI_ENEMY),
  loadPlayer: (): HTMLImageElement => loadImage(SPRITE_PLAYER),
  loadPlayerBullet: (): HTMLImageElement => loadImage(SPRITE_PLAYER_BULLET),
  loadPlayerGetHitAudio: (): HTMLAudioElement => loadAudio(PLAYER_GET_HIT),
  loadPlayerLoseAudio: (): HTMLAudioElement => loadAudio(PLAYER_LOSE),
  loadReversedEnemy: (): HTMLImageElement => loadImage(SPRITE_ENEMY_REVERSED),
  loadShootingAudio: (): HTMLAudioElement => loadAudio(PLAYER_SHOOT)
};
