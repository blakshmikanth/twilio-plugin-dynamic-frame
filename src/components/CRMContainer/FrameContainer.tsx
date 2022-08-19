import React, { useEffect, useState } from "react";
import { Actions } from "@twilio/flex-ui";
import IFrameContainer from "./IFrameContainer";

type FrameContainerProps = {
  url: string;
};

const FrameContainer = (props: FrameContainerProps) => {
  const [url, setUrl] = useState("");
  const [containers, setContainers] = useState<any>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  console.log("FrameContainer: ", url);

  useEffect(() => {
    // setUrl(crmUrl);

    Actions.addListener("beforeAcceptTask", (payload, cancelActionInvocation) => {
      console.log("beforeAcceptTask", payload);
      console.log("Url", payload.task.attributes.url);
      setUrl(payload.task.attributes.url);
    });

    Actions.addListener("beforeSelectTask", (payload, cancelActionInvocation) => {
      console.log("beforeSelectTask", payload);
      setSelectedTask(payload.task);
      const existingContainer = containers.find((x: any) => x.sid === payload.task.sid);
      console.log("existingContainer", existingContainer);
      if (!existingContainer) setContainers([...containers, payload.task]);

      console.log("Url", payload.task.attributes.url);
      // setUrl(payload.task.attributes.url);
    });

    Actions.addListener("afterCompleteTask", (payload, cancelActionInvocation) => {
      console.log("afterCompleteTask", payload);
    });

    return () => {
      Actions.removeListener("beforeSelectTask", (payload) => {});
      Actions.removeListener("beforeAcceptTask", (payload) => {});
      Actions.removeListener("afterCompleteTask", (payload, cancelActionInvocation) => {});
    };
  }, [url]);

  const getContainers = () => {
    if (!containers) return;
    console.log("Containers", containers);
    const items = containers.map((container: any, index: number) => {
      console.log("Container", container);
      return (
        <div key={container.sid} style={getStyles(container)}>
          + <IFrameContainer url={container.attributes.url} />
        </div>
      );
    });

    return items;
  };

  const getStyles = (container: any) => {
    console.log("Container", container);
    if (container.sid !== selectedTask.sid) return { display: "none" };
    return { width: "100%", height: "100%" };
  };

  return (
    <>
      {/* <iframe src={url} style={{ width: "100%", height: "100%" }} /> */}
      {getContainers()}
    </>
  );
};

export default FrameContainer;
