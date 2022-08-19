import React from "react";

const IFrameContainer = (props: any) => {
  console.log("Rendering IFrameContainer", props.url);

  return <iframe style={{ width: "100%", height: "100%" }} src={props.url} />;
};

const areEqual = (prevProps: any, nextProps: any) => {
  console.log("areEqual", prevProps, nextProps);
  return prevProps.url === nextProps.url;
};

export default React.memo(IFrameContainer, areEqual);
