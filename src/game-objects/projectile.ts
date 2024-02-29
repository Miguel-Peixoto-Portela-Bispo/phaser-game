export default class Projectile extends Phaser.GameObjects.Rectangle {

    private static readonly SPEED = 80;
    private static readonly MAX_LIFE_TIME = 10_000;

    private readonly DIRECTION_ANGLE: number;
    private time = 0;
    constructor(scene: Phaser.Scene, x: number, y: number, color: number, directionAngle: number)
    {
        super(scene, x, y, 4, 4, color, 1);
        this.DIRECTION_ANGLE = directionAngle;
        this.setPhysics();
    }
    public update(delta: number): void
    {
        this.time+=delta;
        this.checkDestruction();
    }
    public getBody()
    {
        return <Phaser.Physics.Arcade.Body>this.body;
    }
    private static getVelocity(angle: number): Phaser.Math.Vector2
    {
        const radiansAngle = angle*(Math.PI/180);
        const speed = Projectile.SPEED;
        const cos = Math.cos(radiansAngle);
        const sin = Math.sin(radiansAngle);

        return new Phaser.Math.Vector2(cos*speed, sin*speed);
    }
    private setPhysics()
    {
        const velocity = Projectile.getVelocity(this.DIRECTION_ANGLE);

        this.scene.physics.add.existing(this);
        this.getBody().allowGravity = false;
        this.getBody().setVelocity(velocity.x, velocity.y);
    }
    private checkDestruction(): void
    {
        if(!(this.time>=Projectile.MAX_LIFE_TIME)) return;
        
        this.destroy();
    }
}