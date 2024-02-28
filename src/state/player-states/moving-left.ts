import Player from "../../game-objects/player";
import MovingPlayerState from "./moving";

export default class MovingLeftPlayerState extends MovingPlayerState {
    
    constructor(player: Player)
    {
        super(player, "ArrowLeft", -1);
    }
}