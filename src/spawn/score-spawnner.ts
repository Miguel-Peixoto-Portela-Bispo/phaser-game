import ScoreObject from "../game-objects/score-object";
import Spawnner from "./spawnner";

export default class ScoreSpawnner extends Spawnner<ScoreObject> {

    protected create(): ScoreObject
    {
        const scene = this.group.scene;
        const x = Math.random()*scene.physics.world.bounds.width;
        const y = -4;

        return new ScoreObject(scene, x, y);
    }
}