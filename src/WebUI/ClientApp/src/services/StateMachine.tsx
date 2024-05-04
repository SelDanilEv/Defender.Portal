interface StateMachineModel {
  states: StateModel[];
  currentState: string;
  onStateChanged: () => void;
}

export class StateModel {
  name: string;
  onState: () => void;

  constructor(name: string, onState: () => void) {
    this.name = name;
    this.onState = onState;
  }
}

export class StateMachine {
  private frezed: boolean = false;
  private stateMachine: StateMachineModel;
  private initState: string = "-1";

  constructor(states: StateModel[], onStateChanged = (): void => {}) {
    if (!states || states.length === 0) {
      throw new Error("States cannot be empty");
    }

    this.stateMachine = {
      states: states,
      currentState: this.initState,
      onStateChanged: onStateChanged,
    };

    this.updateState(states[0].name);
  }

  updateState(newStateName: string) {
    if (newStateName === this.stateMachine.currentState) return;

    if (!this.stateMachine.states.some((x) => x.name === newStateName)) {
      throw new Error("Invalid state");
    }

    let oldState = this.stateMachine.currentState;
    if (this.frezed) {
      console.log("State machine is frezed");
      return;
    }
    console.log("State changed from: ", this.stateMachine?.currentState);
    console.log("State changed to: ", newStateName);
    this.stateMachine.currentState = newStateName;
    this.stateMachine.states.find((x) => x.name === newStateName)?.onState();

    if (oldState !== this.initState) {
      this.stateMachine.onStateChanged();
    }
  }

  isState(state: string): boolean {
    return this.stateMachine.currentState === state;
  }

  getCurrentState() {
    return this.stateMachine.currentState;
  }

  freeze() {
    this.frezed = true;
  }
}

export default StateMachine;
