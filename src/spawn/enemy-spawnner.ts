import Enemy from "../game-objects/enemy";
import Spawnner from "./spawnner";

export default class EnemySpawnner extends Spawnner<Enemy> {

    private enemyTexture: string;
    public constructor(scene: Phaser.Scene, enemyTexture: string, minTime: number, maxTime: number = minTime)
    {
        super(scene, minTime, maxTime);
        this.enemyTexture = enemyTexture
    }
    protected create(): Enemy
    {
        const worldBounds = this.group.scene.physics.world.bounds;
        const rand = Math.random();
        const x = rand>0.5?-8:worldBounds.width;
        const y = Math.random()*(worldBounds.height/2-8)+worldBounds.height/2;
        const directionAngle = rand>0.5?0:180;


        return new Enemy(this.group.scene, x, y, this.enemyTexture, directionAngle);
    }

}