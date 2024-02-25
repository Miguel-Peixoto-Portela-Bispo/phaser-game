import Player from "../game-objects/player";
import State from "./state";

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;

export default abstract class PlayerState extends State<CursorKeys> {

    protected player: Player;
    constructor(player: Player)
    {
        super();
        this.player = player;
    }
    public update(delta: number): void
    {
        let velocityMultplier = 0;
        const intervalMultiplier = delta/(1000/60);

        if(this.player.isCollidingBottom()) velocityMultplier = 0.965*intervalMultiplier;
        else                                velocityMultplier = 0.975*intervalMultiplier;
        this.player.getBody().velocity.x*=velocityMultplier;
    }
}