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
        const differenceX = this.source.target.x-x;
        const differenceY = this.source.target.y-y;
        const angle = Math.atan2(differenceY, differenceX)*(180/Math.PI);

        return new Projectile(this.group.scene, x, y, 0xFF3333, angle);
    }
}