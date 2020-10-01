import { loadAudio, loadImage } from "@/classes/core/utilities";

enum Assets {
  BACKGROUND = "background.png",
  BACKGROUND_MUSIC = "background-music.mp3",
  ENEMY_EXPLODE_AUDIO = "enemy-explode.wav",
  ENEMY_MINI_EXPLODE_AUDIO = "enemy-mini-explode.wav",
  EXPLODE_SPRITE = "explode-sprite.png",
  METEOR = "meteor.svg",
  PLAYER_EXPLODE = "player-explode.wav",
  PLAYER_HIT_AUDIO = "player-get-hit.ogg",
  PLAYER_HIT_SPRITE = "sprite-player-hit.png",
  PLAYER_SHOOT = "player-shoot.ogg",
  SPRITE_ENEMY = "sprite-enemy.png",
  SPRITE_ENEMY_BULLET_CIRCLE = "sprite-enemy-bullet-circle.png",
  SPRITE_ENEMY_BULLET_LASER = "sprite-enemy-bullet-laser.png",
  SPRITE_ENEMY_MINI_1 = "sprite-enemy-mini-1.png",
  SPRITE_ENEMY_MINI_2 = "sprite-enemy-mini-2.png",
  SPRITE_ENEMY_MINI_3 = "sprite-enemy-mini-3.png",
  SPRITE_ENEMY_MINI_4 = "sprite-enemy-mini-4.png",
  SPRITE_ENEMY_MINI_5 = "sprite-enemy-mini-5.png",
  SPRITE_ENEMY_REVERSED = "sprite-enemy-reversed.png",
  SPRITE_PLAYER = "sprite-player.png",
  SPRITE_PLAYER_BULLET = "sprite-player-bullet.png"
}

const {
  BACKGROUND,
  BACKGROUND_MUSIC,
  ENEMY_EXPLODE_AUDIO,
  ENEMY_MINI_EXPLODE_AUDIO,
  EXPLODE_SPRITE,
  METEOR,
  PLAYER_EXPLODE,
  PLAYER_HIT_AUDIO,
  PLAYER_HIT_SPRITE,
  PLAYER_SHOOT,
  SPRITE_ENEMY,
  SPRITE_ENEMY_BULLET_CIRCLE,
  SPRITE_ENEMY_BULLET_LASER,
  SPRITE_ENEMY_MINI_1,
  SPRITE_ENEMY_MINI_2,
  SPRITE_ENEMY_MINI_3,
  SPRITE_ENEMY_MINI_4,
  SPRITE_ENEMY_MINI_5,
  SPRITE_ENEMY_REVERSED,
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
  loadEnemyExplodeAudio: (): HTMLAudioElement => loadAudio(ENEMY_EXPLODE_AUDIO),
  loadEnemyMiniExplodeAudio: (): HTMLAudioElement =>
    loadAudio(ENEMY_MINI_EXPLODE_AUDIO),
  loadExplodeSprite: (): HTMLImageElement => loadImage(EXPLODE_SPRITE),
  loadMeteor: (): HTMLImageElement => loadImage(METEOR),
  loadMiniEnemy1: (): HTMLImageElement => loadImage(SPRITE_ENEMY_MINI_1),
  loadMiniEnemy2: (): HTMLImageElement => loadImage(SPRITE_ENEMY_MINI_2),
  loadMiniEnemy3: (): HTMLImageElement => loadImage(SPRITE_ENEMY_MINI_3),
  loadMiniEnemy4: (): HTMLImageElement => loadImage(SPRITE_ENEMY_MINI_4),
  loadMiniEnemy5: (): HTMLImageElement => loadImage(SPRITE_ENEMY_MINI_5),
  loadPlayer: (): HTMLImageElement => loadImage(SPRITE_PLAYER),
  loadPlayerBullet: (): HTMLImageElement => loadImage(SPRITE_PLAYER_BULLET),
  loadPlayerExplodeAudio: (): HTMLAudioElement => loadAudio(PLAYER_EXPLODE),
  loadPlayerGetHitAudio: (): HTMLAudioElement => loadAudio(PLAYER_HIT_AUDIO),
  loadPlayerHitSprite: (): HTMLImageElement => loadImage(PLAYER_HIT_SPRITE),
  loadReversedEnemy: (): HTMLImageElement => loadImage(SPRITE_ENEMY_REVERSED),
  loadShootingAudio: (): HTMLAudioElement => loadAudio(PLAYER_SHOOT)
};
