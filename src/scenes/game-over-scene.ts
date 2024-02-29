import fontImage from "/font.png";
import fontData from "/font.xml";

import MainScene from "./main-scene";

export default class GameOverScene extends Phaser.Scene {

    public static readonly GAME_OVER_SCENE_KEY = "over";
    private static readonly FONT_NAME = "main-font-game-over";
    private static readonly TEXT = "GAME\nOVER\n\n-click-";
    private gameOverText: Phaser.GameObjects.BitmapText | undefined;

    public constructor()
    {
        super({ key: GameOverScene.GAME_OVER_SCENE_KEY });
    }

    public preload(): void
    {
        this.load.bitmapFont(GameOverScene.FONT_NAME, fontImage, fontData);
    }
    public create(): void
    {
        this.gameOverText = this.add.bitmapText(0, this.cameras.main.centerY/2, GameOverScene.FONT_NAME, GameOverScene.TEXT, 8, 1);
        this.gameOverText.setX(this.cameras.main.centerX-this.gameOverText.width/2);
        this.input.once('pointerdown', this.changeScene.bind(this));
    }
    private changeScene(): void
    {
        const sceneManager =  this.game.scene;

        sceneManager.stop(GameOverScene.GAME_OVER_SCENE_KEY);
        sceneManager.start(MainScene.MAIN_SCENE_KEY);
    }
}