import State from "./state";

export default class StateMachine<T, U extends State<T>> {

    private currentState: U | undefined;
    public readonly states = new Map<string, U>();
    public constructor()
    {
        
    }
    public update(delta: number)
    {
        this.currentState?.update(delta);
    }
    public handleInput(input: T)
    {
        this.currentState?.handleInput(input);
    }
    public enterState(key: string)
    {
        this.currentState?.exit();
        this.currentState = this.states.get(key);
        this.currentState?.enter();
    }
}