import React from "react";

import { CustomTaskListComponentStyles } from "./CustomTaskList.Styles";
import { StateToProps, DispatchToProps } from "./CustomTaskList.Container";

interface OwnProps {
  // Props passed directly to the component
}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = StateToProps & DispatchToProps & OwnProps;

// It is recommended to keep components stateless and use redux for managing states
const CustomTaskList: React.FunctionComponent<Props> = (props: Props) => {
  if (!props.isOpen) {
    return null;
  }

  const handleClick = (url: string) => {
    console.log("Button clicked ", url);
  };

  return (
    <CustomTaskListComponentStyles>
      {/* <i className="accented" onClick={props.dismissBar} aria-hidden="true">
        close
      </i> */}

      <button onClick={() => handleClick("https://www.lakshmikanth.com")}>Frame 1</button>
      <button onClick={() => handleClick("https://flow.lakshmikanth.com")}>Frame 2</button>
    </CustomTaskListComponentStyles>
  );
};

CustomTaskList.displayName = "foo";

export default CustomTaskList;
