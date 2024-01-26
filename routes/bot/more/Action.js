//CreateAction.js
import { Signal } from "../Utils/SIgnal2.js";
export class Action {
  constructor(name, execute, times) {
    this._state = new Signal({
      name: name,
      execute: execute,
      times: times
    });
  }

  executeAction(player) {
    if (this._state.times > 0) {
      this._state.execute(player);
      this._state.times--;
    }
  }
}

export function createAction(action) {
  return new Action(action.name, action.execute, action.times);
}
/*
export class Action {
    constructor(name, execute, times) {
      this.name = name;
      this.execute = execute;
      this.times = times;
    }
  
    executeAction(player) {
      if (this.times > 0) {
        this.execute(player);
        this.times--;
      }
    }
  }
  export function createAction(action) {
    return new Action(action.name, action.execute, action.times);
  }
  
  */