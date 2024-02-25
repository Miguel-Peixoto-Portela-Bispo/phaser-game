import StateMachine from "./state-machine";

export default abstract class State<T> {

    public abstract update(delta: number): void;
    public abstract enter(): void;
    public abstract exit(): void;
    public abstract handleInput(input: T): void;
}