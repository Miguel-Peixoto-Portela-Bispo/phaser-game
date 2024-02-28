import Phaser from "phaser";
import MainScene from "./scenes/main-scene";
import GameOverScene from "./scenes/game-over-scene";

new Phaser.Game({
    scene: [GameOverScene, MainScene],
    pixelArt: true,
    width: 64,
    height: 64,
    backgroundColor: "rgba(0, 0, 0, 1)",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 250,
                x: 0
            }
        }
    }
});