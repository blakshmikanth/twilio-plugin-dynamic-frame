import React, { useEffect, useRef } from "react";
import { Actions } from "@twilio/flex-ui";

const hiddenContainer = "display: none; width: 100%; height: 100%;";
const showContainer = "width: 100%; height: 100%;";
const CommonClassName = "tw-frame";
const divStyle = {
  width: "100%",
  height: "100%",
};

const RefContainer = () => {
  const containerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Rendering container element");
    if (!containerElement.current) return;

    Actions.addListener("afterAcceptTask", handleTaskEvent);
    Actions.addListener("beforeSelectTask", handleTaskEvent);
    Actions.addListener("afterCompleteTask", handleCompleteTaskEvent);

    return () => {
      Actions.removeListener("beforeSelectTask", (payload) => {});
      Actions.removeListener("afterCompleteTask", (payload) => {});
    };
  }, []);

  /**
   * To handle Flex events (AcceptTask and SelectTask)
   * @param payload Payload from Flex Event
   * @returns none
   */
  const handleTaskEvent = (payload: any) => {
    // SelectTask fires after agent completes the task with empty payload. Ignore this event
    if (payload.task === null) return;

    // hide all frames
    hideAllFrames();

    // create a new frame if it doesn't exist and display it to the user
    const frameCollection = getIFrames(payload.task.sid);
    if (frameCollection === undefined || frameCollection.length === 0) createFrame(payload);
    else showFrame(frameCollection);
  };

  const handleCompleteTaskEvent = (payload: any) => {
    // get the iframe element and remove it
    const frameCollection = getIFrames(payload.task.sid);
    if (frameCollection === undefined || frameCollection.length === 0) return;
    // element found. Remove it from the collection
    containerElement.current?.removeChild(frameCollection[0]);
  };

  /**
   * Hide all iFrames in the container
   */
  const hideAllFrames = () => {
    const frames = getIFrames(CommonClassName); //containerElement.current?.getElementsByClassName("tw-frame");
    [].forEach.call(frames, (frame: any) => {
      console.log(frame);
      frame.setAttribute("style", hiddenContainer);
    });
  };

  /**
   * Creates a new iFrame element, add it to the container and set visibility
   * to true, if not exists
   * @param payload
   */
  const createFrame = (payload: any) => {
    const element = document.createElement("iframe");
    element.src = payload.task.attributes.url;
    element.className = `${payload.task.sid} ${CommonClassName}`;
    element.setAttribute("style", showContainer);
    containerElement.current?.appendChild(element);
  };

  /**
   * To get iFrame collection
   * @param className Class name of the iFrame
   * @returns iFrame Element collection
   */
  const getIFrames = (className: any) => {
    return containerElement.current?.getElementsByClassName(className);
  };

  /**
   * Show a frame element
   * @param frameCollection collection of frame elements. Should be only one
   */
  const showFrame = (frameCollection: any) => {
    frameCollection[0].setAttribute("style", showContainer);
  };

  return (
    <div style={divStyle}>
      <div ref={containerElement} style={divStyle}></div>
    </div>
  );
};

export default RefContainer;
