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
  SPRITE_PLAYER_BULLET_2 = "sprite-player-bullet-2.webp",
  SPRITE_PLAYER_SHIELD = "sprite-player-shield.webp",
  SPRITE_POWER_UP_BULLET = "sprite-power-up-bullet.webp",
  SPRITE_POWER_UP_HEALTH = "sprite-power-up-health.webp"
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
  SPRITE_PLAYER_BULLET_2,
  SPRITE_PLAYER_SHIELD,
  SPRITE_POWER_UP_BULLET,
  SPRITE_POWER_UP_HEALTH
} = AssetsDictionary;

export default function loadAssets(isDummy: boolean = false): Assets {
  return {
    backgroundImage: loadImage(BACKGROUND, isDummy),
    backgroundMusic1: loadAudio(BACKGROUND_MUSIC_1, isDummy),
    backgroundMusic2: loadAudio(BACKGROUND_MUSIC_2, isDummy),
    backgroundMusic3: loadAudio(BACKGROUND_MUSIC_3, isDummy),
    enemy1: loadImage(SPRITE_ENEMY_1, isDummy),
    enemy2: loadImage(SPRITE_ENEMY_2, isDummy),
    enemy3: loadImage(SPRITE_ENEMY_3, isDummy),
    enemy4: loadImage(SPRITE_ENEMY_4, isDummy),
    enemy5: loadImage(SPRITE_ENEMY_5, isDummy),
    enemy6: loadImage(SPRITE_ENEMY_6, isDummy),
    enemy7: loadImage(SPRITE_ENEMY_7, isDummy),
    enemy8: loadImage(SPRITE_ENEMY_8, isDummy),
    enemy9: loadImage(SPRITE_ENEMY_9, isDummy),
    enemyBulletCircle: loadImage(SPRITE_ENEMY_BULLET_CIRCLE, isDummy),
    enemyBulletLaser: loadImage(SPRITE_ENEMY_BULLET_LASER, isDummy),
    enemyExplodeAudio: loadAudio(ENEMY_EXPLODE_AUDIO, isDummy),
    enemyMini: loadImage(SPRITE_ENEMY_MINI, isDummy),
    enemyMiniExplodeAudio: loadAudio(ENEMY_MINI_EXPLODE_AUDIO, isDummy),
    explodeSprite: loadImage(EXPLODE_SPRITE, isDummy),
    meteor: loadImage(METEOR, isDummy),
    player1: loadImage(SPRITE_PLAYER_1, isDummy),
    player2: loadImage(SPRITE_PLAYER_2, isDummy),
    player3: loadImage(SPRITE_PLAYER_3, isDummy),
    player4: loadImage(SPRITE_PLAYER_4, isDummy),
    player5: loadImage(SPRITE_PLAYER_5, isDummy),
    playerBullet1: loadImage(SPRITE_PLAYER_BULLET_1, isDummy),
    playerBullet2: loadImage(SPRITE_PLAYER_BULLET_2, isDummy),
    playerExplodeAudio: loadAudio(PLAYER_EXPLODE, isDummy),
    playerHitAudio: loadAudio(PLAYER_HIT_AUDIO, isDummy),
    playerHitSprite: loadImage(PLAYER_HIT_SPRITE, isDummy),
    playerPowerUpAudio: loadAudio(PLAYER_POWER_UP_AUDIO, isDummy),
    playerShield: loadImage(SPRITE_PLAYER_SHIELD, isDummy),
    powerUpBullet: loadImage(SPRITE_POWER_UP_BULLET, isDummy),
    powerUpHealth: loadImage(SPRITE_POWER_UP_HEALTH, isDummy),
    shootingAudio: loadAudio(PLAYER_SHOOT, isDummy)
  };
}
