import Enemy from "../game-objects/enemy";
import Projectile from "../game-objects/projectile";
import Spawnner from "./spawnner";

export default class EnemyProjectileSpawnner extends Spawnner<Projectile> {

    private source: Enemy;

    public constructor(source: Enemy, minTime: number, maxTime: number = minTime)
    {
        super(source.scene, maxTime, maxTime);
        this.source = source;
    }
    protected create(): Projectile
    {
        const center = this.source.getCenter();
        const x = center.x;
        const y = center.y;

        return new Projectile(this.group.scene, x, y, 0xFF3333, 90);
    }
}