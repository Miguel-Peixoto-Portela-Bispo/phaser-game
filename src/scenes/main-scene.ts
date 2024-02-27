import Enemy from "../game-objects/enemy";
import Player from "../game-objects/player";
import ScoreObject from "../game-objects/score-object";
import EnemySpawnner from "../spawn/enemy-spawnner";
import ScoreSpawnner from "../spawn/score-spawnner";
import Spawnner from "../spawn/spawnner";

export default class MainScene extends Phaser.Scene {

    private scoreText: Phaser.GameObjects.BitmapText | undefined;
    private scoreSpawnner: Spawnner<ScoreObject> | undefined;
    private enemySpawnner: Spawnner<Enemy> | undefined;
    private keys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    private player: Player | undefined;

    constructor()
    {
        super({ key: "main" });
    }

    public preload(): void
    {
        this.load.bitmapFont("font", "./src/assets/font.png",  "./src/assets/font.xml");
        this.load.spritesheet("player", "./src/assets/player.png", {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("enemy", "./src/assets/enemy.png", {
            frameWidth: 8,
            frameHeight: 8
        });
    }
    public create(): void
    {
        this.scoreSpawnner = new ScoreSpawnner(this, 1000, 2000);
        this.enemySpawnner = new EnemySpawnner(this, "enemy", 500, 1500);
        this.player = this.createPlayer();
        this.add.existing(this.player);
        this.scoreText = this.createScoreText();
        this.updateScoreText();
        this.setPhysics();
        this.keys = this.input.keyboard?.createCursorKeys();
    }
    public update(time: number, delta: number): void
    {
        this.enemySpawnner?.update(delta);
        this.enemySpawnner?.updateGroup(delta);
        this.scoreSpawnner?.update(delta);
        if(this.keys) this.player?.update(delta, this.keys);
    }
    private createPlayer(): Player
    {
        const bounds = this.physics.world.bounds;
        const x = bounds.centerX-8/2;
        const y = bounds.top;

        return new Player(this, x, y, "player");
    }
    private createScoreText(): Phaser.GameObjects.BitmapText
    {
        const y = this.cameras.main.centerY/2;

        return this.add.bitmapText(0, y, "font", "", 8, 1);
    }
    private setPhysics(): void
    {
        if(!this.player||!this.scoreSpawnner||!this.enemySpawnner) return;

        this.physics.add.overlap(this.player, this.scoreSpawnner.group,
            (player, score)=>
            {
                if(!this.player) return;
                score.destroy(true);
                this.player.score++;
                this.updateScoreText();
            }
        );
        this.physics.add.overlap(this.player, this.enemySpawnner.group,
            (player, enemy) =>
            {
                if(!this.player) return;

                const realEnemy = <Enemy> enemy;
                const x = this.player.x-realEnemy.x;
                const y = this.player.y-realEnemy.y;

                this.cameras.main.shake(180, 0.072, true);
                realEnemy.die();
                this.player?.receiveDamage(1, Math.atan2(y, x)*(180/Math.PI));
            }
        );
        this.physics.world.setBoundsCollision(true, true, false, true);
    }
    private updateScoreText(): void
    {
        if(!this.player) return;

        this.scoreText?.setText("score:\n"+this.player.score.toString());
        this.scoreText?.setX(this.cameras.main.centerX-this.scoreText.width/2);
    }
}