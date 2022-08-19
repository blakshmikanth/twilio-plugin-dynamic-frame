import { AppState as FlexAppState } from "@twilio/flex-ui";
import { combineReducers, Action as ReduxAction } from "redux";

import { CustomTaskListState, reduce as CustomTaskListReducer } from "./CustomTaskListState";

// get frame reducers
import { CustomFrameState, reduce as CustomFrameReducer } from "./CustomFrameState";

// Register your redux store under a unique namespace
export const namespace = "iframe";

// Extend this payload to be of type that your ReduxAction is
export interface Action extends ReduxAction {
  payload?: any;
}

// Register all component states under the namespace
export interface AppState {
  flex: FlexAppState;
  iframe: {
    customTaskList: CustomTaskListState;
    customFrame: CustomFrameState;
  };
}

// Combine the reducers
export default combineReducers({
  customTaskList: CustomTaskListReducer,
  customFrame: CustomFrameReducer,
});
