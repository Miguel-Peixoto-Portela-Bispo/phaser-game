export default class ScoreObject extends Phaser.GameObjects.Rectangle {

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 2, 2, 0xFFFF11, 1);
        this.setPhysics();
    }
    private getBody(): Phaser.Physics.Arcade.Body
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