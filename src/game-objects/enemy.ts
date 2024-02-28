export default class Enemy extends Phaser.GameObjects.Sprite {

    private time = Math.random()*360;
    private static readonly SPEED = 30;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, directionAngle: number)
    {
        super(scene, x, y, texture);
        this.setPhysics(directionAngle);
        this.setOrigin(0, 0);
    }
    update(delta: number): void
    {
        const angle = this.time*(Math.PI/180);
        const sin = Math.sin(angle);
        const y = sin*Enemy.SPEED;

        this.time+=delta*(Math.random()*0.4);
        this.getBody().setVelocityY(y);
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
    public die(): void
    {
        const center = this.getBody().center;
        const emitter = this.scene.add.particles(center.x, center.y, this.texture, {
            accelerationX: {
                onEmit: ()=> (Math.random()-0.5)*100
            },
            accelerationY: {
                onEmit: ()=> (Math.random()-0.5)*100
            },
            scale: {
                start: 0.6,
                end: 0.05
            },
            rotate: {
                onEmit: ()=> Math.random()*(Math.PI*2),
                steps: Math.random()*0.1
            },
            frequency: 5,
            duration: 80
        });

        emitter.start();
        this.destroy(true);
    }
}