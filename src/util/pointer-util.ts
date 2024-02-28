export default class PointerUtil {

    private static readonly TRESH_HOLD = 40;
    private lastClickTime = 0;
    private swipeStart: Phaser.Math.Vector2 | null = new Phaser.Math.Vector2(0, 0);
    private readonly scene: Phaser.Scene;
    private swipeAngle = 0;
    private swipeLength = 0;

    public constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        scene.input.on("pointermove", this.handleMove.bind(this));
        scene.input.on("pointerup", this.handleUp.bind(this));
        scene.input.on("pointerdown", this.handleDown.bind(this));
    }

    public checkDoubleTap(): boolean
    {
        const now = this.scene.time.now;
        const delay = now-this.lastClickTime;

        this.lastClickTime = now;
        return delay<200;
    }
    public madeSwipe(minAngle: number, maxAngle: number): boolean
    {
        return this.hasSwipe(minAngle, maxAngle)&&!this.swipeStart;
    }
    public hasSwipe(minAngle: number, maxAngle: number): boolean
    {
        const realAngle = this.getRealAngle();

        return realAngle>=minAngle&&realAngle<=maxAngle&&this.swipeLength>=PointerUtil.TRESH_HOLD;
    }
    public isSwiping(minAngle: number, maxAngle: number): boolean
    {
        return this.hasSwipe(minAngle, maxAngle)&&this.swipeStart!==null;
    }
    private getRealAngle(): number
    {
        const angleInDegrees = this.swipeAngle*(180/Math.PI);
        const result = angleInDegrees*-1+360

        return result;
    }
    private handleMove(): void
    {
        if(!this.swipeStart) return;
        
        const currentSwipe = this.scene.input.pointer1.position.clone();
        const distanceVector = currentSwipe.subtract(this.swipeStart);

        this.swipeAngle = distanceVector.angle();
        this.swipeLength = distanceVector.length();
    }
    private handleDown(): void
    {
        this.swipeStart = this.scene.input.pointer1.position.clone();
    }
    private handleUp(): void
    {
        this.swipeStart = null;
        this.swipeLength = 0;
    }
}