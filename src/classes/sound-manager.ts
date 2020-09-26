export default class SoundManager {
    public backgroundMusic: HTMLAudioElement;
    public bulletSound: HTMLAudioElement;
    private static soundManager:SoundManager | null = null;

    private constructor() {
        this.backgroundMusic = this.createAudioElement(`${process.env.BASE_URL}backsound.mp3`);
        this.bulletSound = this.createAudioElement(`${process.env.BASE_URL}player-shoot.wav`);
        this.attachSound();
    }

    public static getInstance() {
        if(this.soundManager == null) {
            this.soundManager = new SoundManager();
        }

        return this.soundManager;
    }

    private createAudioElement(src:string):HTMLAudioElement {
        const audio:HTMLAudioElement = document .createElement("audio");
        audio.src = src;
        audio.setAttribute("preload", "auto");
        audio.setAttribute("controls", "none");
        audio.style.display = "none";
        return audio;
    }

    private attachSound(): void {
        document.body.appendChild(this.backgroundMusic);
        document.body.appendChild(this.bulletSound);
    }

    public playBackgroundMusic(): void {
        this.backgroundMusic.play();
    }

    public stopBackgroundMusic(): void {
        this.backgroundMusic.pause();
    }

    public playBulletSound(): void {
        this.bulletSound.play();
        console.log("bullet");
    }
 }