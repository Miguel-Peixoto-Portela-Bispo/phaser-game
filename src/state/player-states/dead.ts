import GameOverScene from "../../scenes/game-over-scene";
import MainScene from "../../scenes/main-scene";
import PlayerState from "../player-state";

export default class DeadPlayerState extends PlayerState {

    private static readonly MAX_TIME = 3000;

    private timer = 0;

    public enter(): void
    {
        this.player.depth = 999;
        this.player.setFrame(0);
        this.player.getBody().setVelocity(0, -120);
        this.player.getBody().setAcceleration(0, 0);
        this.player.setOrigin(0.5, 0.5);
        this.player.getBody().setCollideWorldBounds(false);
    }
    public update(delta: number): void
    {
        this.player.scale = Math.min(2, this.player.scale+0.1);
        this.timer+=delta;
        this.player.angle = this.timer/1.5;
        if(this.timer>=DeadPlayerState.MAX_TIME)
        {
            const sceneManager = this.player.scene.game.scene;

            this.timer = 0;
            sceneManager.stop(MainScene.MAIN_SCENE_KEY);
            sceneManager.start(GameOverScene.GAME_OVER_SCENE_KEY);
        }
    }
    public exit(): void
    {
        
    }
    
}