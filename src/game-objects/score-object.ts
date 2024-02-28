export default class ScoreObject extends Phaser.GameObjects.Rectangle {

    private static readonly MAX_LIFE_TIEME = 1000;
    private timer = 0;
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 2, 2, 0xFFFF33, 1);
        this.setPhysics();
    }
    public update(delta: number)
    {
        if(Math.abs(this.getBody().velocity.y)<10) this.timer+=delta;

        if(this.timer>=ScoreObject.MAX_LIFE_TIEME)
        {
            this.destroy(true);
        }
    }

    public getBody(): Phaser.Physics.Arcade.Body
    {
        return <Phaser.Physics.Arcade.Body> this.body;
    }
    private setPhysics(): void
    {
        this.scene.physics.add.existing(this);
        this.getBody().bounce.y = 0.7;
        this.getBody().setCollideWorldBounds(true);
    }
}