import Phaser from "phaser";
import MainScene from "./scenes/main-scene";

const game = new Phaser.Game({
    scene: [MainScene],
    pixelArt: true,
    width: 64,
    height: 64,
    backgroundColor: 0,
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