import { loadAudio, loadImage } from "@/classes/core/utilities";

import Assets from "@/classes/interfaces/assets";

enum AssetsDictionary {
  BACKGROUND = "background.webp",
  BACKGROUND_MUSIC_1 = "background-music-1.wav",
  BACKGROUND_MUSIC_2 = "background-music-2.wav",
  BACKGROUND_MUSIC_3 = "background-music-3.wav",
  ENEMY_EXPLODE_AUDIO = "enemy-explode.wav",
  ENEMY_MINI_EXPLODE_AUDIO = "enemy-mini-explode.wav",
  EXPLODE_SPRITE = "sprite-explode.webp",
  METEOR = "meteor.webp",
  PLAYER_EXPLODE = "player-explode.wav",
  PLAYER_HIT_AUDIO = "player-get-hit.ogg",
  PLAYER_HIT_SPRITE = "sprite-player-hit.webp",
  PLAYER_POWER_UP = "player-power-up.webp",
  PLAYER_POWER_UP_AUDIO = "player-power-up.ogg",
  PLAYER_SHOOT = "player-shoot.ogg",
  SPRITE_ENEMY_1 = "sprite-enemy-1.webp",
  SPRITE_ENEMY_2 = "sprite-enemy-2.webp",
  SPRITE_ENEMY_3 = "sprite-enemy-3.webp",
  SPRITE_ENEMY_4 = "sprite-enemy-4.webp",
  SPRITE_ENEMY_5 = "sprite-enemy-5.webp",
  SPRITE_ENEMY_6 = "sprite-enemy-6.webp",
  SPRITE_ENEMY_7 = "sprite-enemy-7.webp",
  SPRITE_ENEMY_8 = "sprite-enemy-8.webp",
  SPRITE_ENEMY_9 = "sprite-enemy-9.webp",
  SPRITE_ENEMY_BULLET_CIRCLE = "sprite-enemy-bullet-circle.webp",
  SPRITE_ENEMY_BULLET_LASER = "sprite-enemy-bullet-laser.webp",
  SPRITE_ENEMY_MINI = "sprite-enemy-mini.webp",
  SPRITE_PLAYER_1 = "sprite-player-1.webp",
  SPRITE_PLAYER_2 = "sprite-player-2.webp",
  SPRITE_PLAYER_3 = "sprite-player-3.webp",
  SPRITE_PLAYER_4 = "sprite-player-4.webp",
  SPRITE_PLAYER_5 = "sprite-player-5.webp",
  SPRITE_PLAYER_BULLET_1 = "sprite-player-bullet-1.webp",
  SPRITE_PLAYER_BULLET_2 = "sprite-player-bullet-2.webp"
}

const {
  BACKGROUND,
  BACKGROUND_MUSIC_1,
  BACKGROUND_MUSIC_2,
  BACKGROUND_MUSIC_3,
  ENEMY_EXPLODE_AUDIO,
  ENEMY_MINI_EXPLODE_AUDIO,
  EXPLODE_SPRITE,
  METEOR,
  PLAYER_EXPLODE,
  PLAYER_HIT_AUDIO,
  PLAYER_HIT_SPRITE,
  PLAYER_POWER_UP,
  PLAYER_POWER_UP_AUDIO,
  PLAYER_SHOOT,
  SPRITE_ENEMY_1,
  SPRITE_ENEMY_2,
  SPRITE_ENEMY_3,
  SPRITE_ENEMY_4,
  SPRITE_ENEMY_5,
  SPRITE_ENEMY_6,
  SPRITE_ENEMY_7,
  SPRITE_ENEMY_8,
  SPRITE_ENEMY_9,
  SPRITE_ENEMY_BULLET_CIRCLE,
  SPRITE_ENEMY_BULLET_LASER,
  SPRITE_ENEMY_MINI,
  SPRITE_PLAYER_1,
  SPRITE_PLAYER_2,
  SPRITE_PLAYER_3,
  SPRITE_PLAYER_4,
  SPRITE_PLAYER_5,
  SPRITE_PLAYER_BULLET_1,
  SPRITE_PLAYER_BULLET_2
} = AssetsDictionary;

export default function loadAssets(dummy: boolean = false): Assets {
  return {
    backgroundImage: loadImage(BACKGROUND, dummy),
    backgroundMusic1: loadAudio(BACKGROUND_MUSIC_1, dummy),
    backgroundMusic2: loadAudio(BACKGROUND_MUSIC_2, dummy),
    backgroundMusic3: loadAudio(BACKGROUND_MUSIC_3, dummy),
    enemy1: loadImage(SPRITE_ENEMY_1, dummy),
    enemy2: loadImage(SPRITE_ENEMY_2, dummy),
    enemy3: loadImage(SPRITE_ENEMY_3, dummy),
    enemy4: loadImage(SPRITE_ENEMY_4, dummy),
    enemy5: loadImage(SPRITE_ENEMY_5, dummy),
    enemy6: loadImage(SPRITE_ENEMY_6, dummy),
    enemy7: loadImage(SPRITE_ENEMY_7, dummy),
    enemy8: loadImage(SPRITE_ENEMY_8, dummy),
    enemy9: loadImage(SPRITE_ENEMY_9, dummy),
    enemyBulletCircle: loadImage(SPRITE_ENEMY_BULLET_CIRCLE, dummy),
    enemyBulletLaser: loadImage(SPRITE_ENEMY_BULLET_LASER, dummy),
    enemyExplodeAudio: loadAudio(ENEMY_EXPLODE_AUDIO, dummy),
    enemyMiniExplodeAudio: loadAudio(ENEMY_MINI_EXPLODE_AUDIO, dummy),
    explodeSprite: loadImage(EXPLODE_SPRITE, dummy),
    meteor: loadImage(METEOR, dummy),
    enemyMini: loadImage(SPRITE_ENEMY_MINI, dummy),
    player1: loadImage(SPRITE_PLAYER_1, dummy),
    player2: loadImage(SPRITE_PLAYER_2, dummy),
    player3: loadImage(SPRITE_PLAYER_3, dummy),
    player4: loadImage(SPRITE_PLAYER_4, dummy),
    player5: loadImage(SPRITE_PLAYER_5, dummy),
    playerBullet1: loadImage(SPRITE_PLAYER_BULLET_1, dummy),
    playerBullet2: loadImage(SPRITE_PLAYER_BULLET_2, dummy),
    playerExplodeAudio: loadAudio(PLAYER_EXPLODE, dummy),
    playerHitAudio: loadAudio(PLAYER_HIT_AUDIO, dummy),
    playerHitSprite: loadImage(PLAYER_HIT_SPRITE, dummy),
    playerPowerUp: loadImage(PLAYER_POWER_UP, dummy),
    playerPowerUpAudio: loadAudio(PLAYER_POWER_UP_AUDIO, dummy),
    shootingAudio: loadAudio(PLAYER_SHOOT, dummy)
  };
}
