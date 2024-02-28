import Player from "../../game-objects/player";
import MovingPlayerState from "./moving";

export default class MovingRightPlayerState extends MovingPlayerState {
    
    constructor(player: Player)
    {
        super(player, "ArrowRight", 1);
    }
}