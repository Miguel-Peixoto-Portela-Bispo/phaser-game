export default class Enemy extends Phaser.GameObjects.Sprite {

    private time = 0;
    private static readonly SPEED = 30;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, directionAngle: number)
    {
        super(scene, x, y, texture);
        this.setPhysics(directionAngle);
        this.setOrigin(0, 0);
    }
    update(delta: number): void
    {
        const angle = this.time*100;
        const sin = Math.sin(angle);
        const y = sin*150;

        this.time+=delta*100*(Math.random()*0.6+0.4);
        this.getBody().setAccelerationY(y);
    }
    private getBody(): Phaser.Physics.Arcade.Body
    {
        return <Phaser.Physics.Arcade.Body> this.body;
    }
    private setPhysics(angle: number): void
    {
        angle = angle*(Math.PI/180);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const velocityX = cos*Enemy.SPEED;
        const velocityY = sin*Enemy.SPEED;

        this.scene.physics.add.existing(this);
        this.getBody().setAllowGravity(false);
        this.getBody().setVelocity(velocityX, velocityY)
    }
}