import Enemy from "../game-objects/enemy";
import Player from "../game-objects/player";
import Spawnner from "./spawnner";

export default class EnemySpawnner extends Spawnner<Enemy> {

    private readonly enemyTexture: string;
    private readonly enemiesTarget: Player;

    public constructor(scene: Phaser.Scene, enemyTexture: string, enemiesTarget: Player, minTime: number, maxTime: number = minTime)
    {
        super(scene, minTime, maxTime);
        this.enemyTexture = enemyTexture;
        this.enemiesTarget = enemiesTarget;
    }

    protected spawn(): void
    {
        super.spawn();
    }
    protected create(): Enemy
    {
        const worldBounds = this.group.scene.physics.world.bounds;
        const rand = Math.random();
        const x = rand>0.5?-8:worldBounds.width;
        const y = Math.random()*(worldBounds.height/2-8)+worldBounds.height/2;
        const directionAngle = rand>0.5?0:180;
        const result = new Enemy(this.group.scene, x, y, this.enemyTexture, directionAngle, this.enemiesTarget);
        
        this.group.scene.events.emit("enemy-spawnned", result);
        return result;
    }

}