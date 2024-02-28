import StateMachine from "./state-machine";

export default interface State {

    update(delta: number): void;
    enter(): void;
    exit(): void;
}