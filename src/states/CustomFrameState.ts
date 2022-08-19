import { Action } from ".";

const ACTION_SELECTED_TASK = "SELECTED_TASK";

export interface CustomFrameState {
  selectedTask: string;
}

const initialState: CustomFrameState = {
  selectedTask: "",
};

export class Actions {
  public static selectedTask = (taskSid: string): Action => ({
    type: ACTION_SELECTED_TASK,
    payload: taskSid,
  });
}

export function reduce(state: CustomFrameState = initialState, action: Action): CustomFrameState {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case ACTION_SELECTED_TASK: {
      return {
        ...state,
        selectedTask: action.payload,
      };
    }
    default:
      return state;
  }
}
