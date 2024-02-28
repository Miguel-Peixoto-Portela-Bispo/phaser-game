import Enemy from "../game-objects/enemy";
import Player from "../game-objects/player";
import Projectile from "../game-objects/projectile";
import ScoreObject from "../game-objects/score-object";
import EnemySpawnner from "../spawn/enemy-spawnner";
import ScoreSpawnner from "../spawn/score-spawnner";
import Spawnner from "../spawn/spawnner";
import toDegrees from "../util/to-degrees";

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
        this.load.bitmapFont("font", "/font.png",  "/font.xml");
        this.load.spritesheet("player", "/player.png", {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("enemy", "/enemy.png", {
            frameWidth: 8,
            frameHeight: 8
        });
    }
    public create(): void
    {
        this.keys = this.input.keyboard?.createCursorKeys();
        this.scoreSpawnner = new ScoreSpawnner(this, 1000, 2000);
        this.enemySpawnner = new EnemySpawnner(this, "enemy", 2000, 3000);
        this.player = this.createPlayer();
        if(this.player) this.add.existing(this.player);
        this.scoreText = this.createScoreText();
        this.updateScoreText();
        this.setPhysics();
    }
    public update(_: number, delta: number): void
    {
        this.enemySpawnner?.update(delta);
        this.enemySpawnner?.updateGroup(delta);
        this.scoreSpawnner?.update(delta);
        this.scoreSpawnner?.updateGroup(delta);
        if(this.keys) this.player?.update(delta);
        this.enemySpawnner?.decreaseMinimumTime(1/45);
        this.enemySpawnner?.decreaseMaximumTime(1/60);
    }
    private createPlayer(): Player | undefined
    {
        if(!this.keys) return;
        
        const bounds = this.physics.world.bounds;
        const x = bounds.centerX-8/2;
        const y = bounds.top;

        return new Player(this, x, y, "player", this.keys);
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
            (_, score)=>
            {
                if(!this.player) return;
                
                score.destroy(true);
                this.player.score++;
                this.updateScoreText();
            }
        );
        this.physics.add.overlap(this.player, this.enemySpawnner.group,
            (_, enemy) =>
            {
                if(!this.player) return;

                const realEnemy = <Enemy> enemy;
                const x = this.player.x-realEnemy.x;
                const y = this.player.y-realEnemy.y;
                const angle = Math.atan2(y, x)*(180/Math.PI);

                realEnemy.die();
                this.player?.receiveDamage(1, angle);
            }
        );
        this.events.on("enemy-spawnned", this.addEnemyProjectilesOverlap, this);
        this.physics.world.setBoundsCollision(true, true, false, true);
    }
    private updateScoreText(): void
    {
        if(!this.player) return;

        this.scoreText?.setText("score:\n"+this.player.score.toString());
        this.scoreText?.setX(this.cameras.main.centerX-this.scoreText.width/2);
    }
    private addEnemyProjectilesOverlap(e: Enemy)
    {
        if(!this.player) return true;
        
        console.log(e.x)
        this.physics.add.overlap(this.player, e.spawnner.group,
            (_, p) =>
            {
                if(!this.player) return;

                const projectile = <Projectile>p;
                const x = this.player.x-projectile.x;
                const y = this.player.y-projectile.y;
                const angle = toDegrees(Math.atan2(y, x));

                projectile.destroy(true);
                this.player?.receiveDamage(1, angle);
            }
        )
        return true;
    }
}