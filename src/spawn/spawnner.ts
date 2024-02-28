import getRandomNumber from "../util/get-random-number";

export default abstract class Spawnner<T extends Phaser.GameObjects.GameObject> {

    protected maxTime: number;
    protected minTime: number;
    protected randomTime: number;
    protected timer: number;
    protected readonly _group: Phaser.GameObjects.Group;
    public constructor(scene: Phaser.Scene, minTime: number, maxTime: number = minTime)
    {
        this._group = scene.add.group();
        this.timer = 0;
        this.maxTime = maxTime;
        this.minTime = minTime;
        this.randomTime = getRandomNumber(minTime, maxTime);
    }
    public update(delta: number): void
    {
        this.timer+=delta;

        if(this.timer>=this.randomTime)
        {
            this.setRandomTime();
            this.timer = 0;
            this.spawn();
        }
    }
    public updateGroup(delta: number)
    {
        this.group.children.iterate(
            (obj) =>
            {
                obj?.update(delta)
                return true;
            }
        );
    }
    public decreaseMinimumTime(amount: number)
    {
        this.minTime-=amount;
    }
    public decreaseMaximumTime(amount: number)
    {
        this.maxTime-=amount;
    }

    protected abstract create(): T;
    protected spawn(): void
    {
        const obj = this.create();

        this._group.add(obj);
        this._group.scene.add.existing(obj);
    }
    protected setRandomTime(): void
    {
        this.randomTime = getRandomNumber(this.minTime, this.maxTime);
    }
    public get group()
    {
        return this._group;
    }
}