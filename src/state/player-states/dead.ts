import PlayerState from "../player-state";

export default class DeadPlayerState extends PlayerState {

    private static readonly MAX_TIME = 3000;

    private timer = 0;

    public enter(): void
    {
        this.player.setFrame(0);
        this.player.getBody().setVelocity(0, -70);
        this.player.getBody().setAcceleration(0, 0);
        this.player.setOrigin(0.5, 0.5);
        this.player.getBody().setCollideWorldBounds(false);
    }
    public update(delta: number): void
    {
        this.timer+=delta;
        this.player.angle = this.timer/1.5;
        if(this.timer>=DeadPlayerState.MAX_TIME)
        {
            const sceneManager = this.player.scene.game.scene;

            this.timer = 0;
            sceneManager.stop("main");
            sceneManager.start("over");
        }
    }
    public exit(): void
    {
        
    }
    public handleInput(input: Phaser.Types.Input.Keyboard.CursorKeys): void
    {
        
    }

    
}