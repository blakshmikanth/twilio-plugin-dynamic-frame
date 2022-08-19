import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { AppState } from "../../states";
import { Actions } from "../../states/CustomFrameState";
import CustomFrame from "./FrameContainer";

export interface StateToProps {
  selectedTask: string;
}

export interface DispatchToProps {
  selectedTask: (taskSid: string) => void;
}

const mapStateToProps = (state: AppState): StateToProps => ({
  selectedTask: state["iframe"].customFrame.selectedTask,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchToProps => ({
  selectedTask: bindActionCreators(Actions.selectedTask, dispatch),
});
