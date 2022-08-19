import React, { useEffect, useRef } from "react";
import { Actions } from "@twilio/flex-ui";
import * as styles from "./constants";

const DynamicContainer = () => {
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
   * Creates a new iFrame element, add it to the container and set visibility
   * to true, if not exists
   * @param payload
   */
  const createFrame = (payload: any) => {
    const element = document.createElement("iframe");
    element.src = payload.task.attributes.url;
    element.className = `${payload.task.sid} ${styles.common}`;
    element.setAttribute("style", styles.show);
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
   * Hide all iFrames in the container
   */
  const hideAllFrames = () => {
    const frames = getIFrames(styles.common); //containerElement.current?.getElementsByClassName("tw-frame");
    [].forEach.call(frames, (frame: any) => {
      console.log(frame);
      frame.setAttribute("style", styles.hide);
    });
  };

  /**
   * Handle completed task event
   * @param payload Event payload from Flex Event
   */
  const handleCompleteTaskEvent = (payload: any) => {
    // get the iframe element and remove it
    const frameCollection = getIFrames(payload.task.sid);
    if (frameCollection === undefined || frameCollection.length === 0) return;
    // element found. Remove it from the collection
    containerElement.current?.removeChild(frameCollection[0]);
  };

  /**
   * To handle Flex events (AcceptTask and SelectTask)
   * @param payload Event payload from Flex Event
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

  /**
   * Show a frame element
   * @param frameCollection collection of frame elements. Should be only one
   */
  const showFrame = (frameCollection: any) => {
    frameCollection[0].setAttribute("style", styles.show);
  };

  return (
    <div style={styles.fullSize}>
      <div ref={containerElement} style={styles.fullSize}></div>
    </div>
  );
};

export default DynamicContainer;
