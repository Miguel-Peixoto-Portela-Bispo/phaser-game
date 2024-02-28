import State from "./state";

export default class StateMachine<T extends State> {

    private _currentState: T | undefined;
    public readonly states = new Map<string, T>();
    public constructor()
    {
        
    }
    public update(delta: number)
    {
        this.currentState?.update(delta);
    }
    public enterState(key: string)
    {
        this.currentState?.exit();
        this._currentState = this.states.get(key);
        this.currentState?.enter();
    }
    public isInState(state: State)
    {
        return state === this.currentState;
    }
    public get currentState()
    {
        return this._currentState;
    }
}