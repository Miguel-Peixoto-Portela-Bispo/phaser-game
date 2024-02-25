import PlayerState from "../state/player-state";
import IdlePlayerState from "../state/player-states/idle";
import JumpingPlayerState from "../state/player-states/jumping";
import RunningLeftPlayerState from "../state/player-states/running-left";
import RunningRightPlayerState from "../state/player-states/running-right";
import StateMachine from "../state/state-machine";
import PlayerStates from "../util/player-states";

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
const PlayerStateMachine = StateMachine<CursorKeys, PlayerState>;

export default class Player extends Phaser.GameObjects.Sprite {

    public static readonly SPEED = 105;
    public static readonly ANIMATION_NAME = "anim"
    public score = 0;
    private readonly stateMachine =  new PlayerStateMachine();
    public constructor(scene: Phaser.Scene, x: number, y: number, spritesheet: string)
    {
        super(scene, x, y, spritesheet);
        this.createAnim(spritesheet);
        this.setPhysics();
        this.initStates();
        this.setOrigin(0, 0);
    }
    public update(delta: number, keys: Phaser.Types.Input.Keyboard.CursorKeys): void
    {
        this.stateMachine.handleInput(keys);
        this.stateMachine.update(delta);
    }
    public enterState(stateName: PlayerStates)
    {
        this.stateMachine.enterState(stateName);
    }
    public isCollidingBottom(): boolean
    {
        const worldBounds = this.scene.physics.world.bounds;
        const isTouchingScreenBottom = this.getBody().bottom>=worldBounds.bottom-1;

        return isTouchingScreenBottom;
    }
    public getBody(): Phaser.Physics.Arcade.Body
    {
        return <Phaser.Physics.Arcade.Body> this.body;
    }
    private setPhysics()
    {
        this.scene.physics.add.existing(this);
        this.getBody().setCollideWorldBounds(true);
        this.getBody().setBounce(0.4, 0.2);
        this.getBody().maxVelocity.x = 60;
    }
    private createAnim(spritesheet: string)
    {
        this.scene.anims.create({
            key: Player.ANIMATION_NAME,
            frames: this.scene.anims.generateFrameNumbers(spritesheet, { start: 0, end: 4 }),
            frameRate: 11,
            repeat: -1
        });
    }
    private initStates()
    {
        const states = this.stateMachine.states;

        states.set(PlayerStates.IDLE, new IdlePlayerState(this));
        states.set(PlayerStates.RUNNING_LEFT, new RunningLeftPlayerState(this));
        states.set(PlayerStates.RUNNING_RIGHT, new RunningRightPlayerState(this));
        states.set(PlayerStates.JUMPING, new JumpingPlayerState(this));

        this.enterState(PlayerStates.IDLE);
    }
}