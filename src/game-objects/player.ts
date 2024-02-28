import PlayerState from "../state/player-state";
import DeadPlayerState from "../state/player-states/dead";
import IdlePlayerState from "../state/player-states/idle";
import InStunPlayerState from "../state/player-states/in-stun";
import JumpingPlayerState from "../state/player-states/rising";
import MovingLeftPlayerState from "../state/player-states/moving-left";
import MovingRightPlayerState from "../state/player-states/moving-right";
import StateMachine from "../state/state-machine";
import PlayerStates from "../util/player-states";
import FallingPlayerState from "../state/player-states/falling";
import State from "../state/state";

const PlayerStateMachine = StateMachine<PlayerState>;

export default class Player extends Phaser.GameObjects.Sprite {

    private static readonly MAX_INVINCIBLE_TIME = 2000;

    public static readonly SPEED = 105;
    public static readonly ANIMATION_NAME = "anim";
    public static readonly AIR_RESISTENCE = 0.935;
    public static readonly GROUND_RESISTENCE = 0.955

    private maxHealthPoints = 3;
    private healthPoints = this.maxHealthPoints;
    private readonly stateMachine =  new PlayerStateMachine();
    private invincible = false;
    private invincibilityTimer = 0;
    private invincibleFramesTimer = 0;

    public score = 0;
    public knockBackAngle = 0;
    public keys: Phaser.Types.Input.Keyboard.CursorKeys;
    public resistence = 1;

    public constructor(scene: Phaser.Scene, x: number, y: number, spritesheet: string, keys: Phaser.Types.Input.Keyboard.CursorKeys)
    {
        super(scene, x, y, spritesheet);
        this.createAnim(spritesheet);
        this.setPhysics();
        this.initStates();
        this.setOrigin(0, 0);
        this.keys = keys;
    }

    public update(delta: number): void
    {
        this.stateMachine.update(delta);
        this.handleInvinciblity(delta);
        this.checkDeath();
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
    public receiveDamage(damage: number, knockBackAngle: number)
    {
        
        if(this.invincible||this.isInDeadState) return;

        this.invincible = true;
        this.healthPoints = Math.max(0, this.healthPoints-damage);
        this.knockBackAngle = knockBackAngle;
        this.enterState(PlayerStates.IN_STUN);
    }
    public isInState(state: State)
    {
        return this.stateMachine.currentState === state;
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
        states.set(PlayerStates.MOVING_LEFT, new MovingLeftPlayerState(this));
        states.set(PlayerStates.MOVING_RIGHT, new MovingRightPlayerState(this));
        states.set(PlayerStates.RISING, new JumpingPlayerState(this));
        states.set(PlayerStates.FALLING, new FallingPlayerState(this));
        states.set(PlayerStates.IN_STUN, new InStunPlayerState(this));
        states.set(PlayerStates.DEAD, new DeadPlayerState(this));

        this.enterState(PlayerStates.IDLE);
    }
    private handleInvinciblity(delta: number)
    {
        if(!this.invincible) return;

        this.invincibilityTimer+=delta;
        this.invincibleFramesTimer+=delta;
        if(this.invincibleFramesTimer>=Player.MAX_INVINCIBLE_TIME/40)
        {
            this.invincibleFramesTimer = 0;
            this.alpha = this.alpha===0?1:0;
        }
        if(this.invincibilityTimer>=Player.MAX_INVINCIBLE_TIME)
        {
            this.invincibilityTimer = 0;
            this.invincible = false;
            this.alpha = 1;
        }
    }
    private checkDeath(): void
    {
        if(this.isInDeadState||this.healthPoints>0) return;

        this.enterState(PlayerStates.DEAD);
    }
    private get isInDeadState()
    {
        const state = this.stateMachine.states.get(PlayerStates.DEAD);

        return state&&this.stateMachine.isInState(state);
    }
}