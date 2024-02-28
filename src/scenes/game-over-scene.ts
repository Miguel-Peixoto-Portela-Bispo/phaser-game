export default class GameOverScene extends Phaser.Scene {

    private static readonly TEXT = "GAME\nOVER\n\n-click-";
    private gameOverText: Phaser.GameObjects.BitmapText | undefined;

    public constructor()
    {
        super({ key: "over" });
    }

    public preload(): void
    {
        this.load.bitmapFont("font", "/font.png",  "font.xml");
    }
    public create(): void
    {
        this.gameOverText = this.add.bitmapText(0, this.cameras.main.centerY/2, "font", GameOverScene.TEXT, 8, 1);
        this.gameOverText.setX(this.cameras.main.centerX-this.gameOverText.width/2);
        this.input.once('pointerdown', this.changeScene.bind(this));
    }
    private changeScene(): void
    {
        const sceneManager =  this.game.scene;

        sceneManager.stop("over");
        sceneManager.start("main");
    }
}