import React, { useEffect, useRef } from "react";
import { Actions } from "@twilio/flex-ui";

const hiddenContainer = "display: none; width: 100%; height: 100%;";

const showContainer = "width: 100%; height: 100%;";

const RefContainer = () => {
  const containerElement = useRef<HTMLDivElement>(null);

  // console.log("ContainerElement", containerElement.current);

  useEffect(() => {
    console.log("Rendering container element");
    if (!containerElement.current) return;

    Actions.addListener("afterAcceptTask", (payload, cancelActionInvocation) => {
      console.log("afterAcceptTask", payload, cancelActionInvocation);

      if (payload.task === null) return;

      hideAllFrames();
      const frameCollection = containerElement.current?.getElementsByClassName(payload.task.sid);
      if (frameCollection === undefined || frameCollection.length === 0) createFrame(payload);
      else showFrame(frameCollection);
    });

    Actions.addListener("beforeSelectTask", (payload, cancelActionInvocation) => {
      console.log("beforeSelectTask", payload);

      if (payload.task === null) return;

      hideAllFrames();

      const frameCollection = containerElement.current?.getElementsByClassName(payload.task.sid);
      if (frameCollection === undefined || frameCollection.length === 0) createFrame(payload);
      else showFrame(frameCollection);

      // // hide all frames
      // const frames = containerElement.current?.getElementsByClassName("tw-frame");
      // [].forEach.call(frames, (frame: any) => {
      //   console.log(frame);
      //   frame.setAttribute("style", hiddenContainer);
      // });

      // // Check whether the child element exists
      // const childElement = containerElement.current?.getElementsByClassName(payload.task.sid);
      // console.log(childElement);
      // if (childElement === undefined || childElement.length === 0) {
      //   const element = document.createElement("iframe");
      //   element.src = payload.task.attributes.url;
      //   element.className = `${payload.task.sid} tw-frame`;
      //   element.setAttribute("style", showContainer);
      //   containerElement.current?.appendChild(element);
      // } else {
      //   // child element exists. Show the element
      //   childElement[0].setAttribute("style", showContainer);
      // }
    });

    Actions.addListener("afterCompleteTask", (payload, cancelActionInvocation) => {
      console.log("afterCompleteTask", payload);
      // get the iframe element and remove it
      const childElement = containerElement.current?.getElementsByClassName(payload.task.sid);
      console.log(childElement);
      if (childElement === undefined || childElement.length === 0) return;
      // element found. Remove it from the collection
      containerElement.current?.removeChild(childElement[0]);
    });

    return () => {
      Actions.removeListener("beforeSelectTask", (payload) => {});
      Actions.removeListener("afterCompleteTask", (payload) => {});
    };
  }, []);

  /**
   * Hide all iFrames in the container
   */
  const hideAllFrames = () => {
    const frames = containerElement.current?.getElementsByClassName("tw-frame");
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
    element.className = `${payload.task.sid} tw-frame`;
    element.setAttribute("style", showContainer);
    containerElement.current?.appendChild(element);
  };

  /**
   * To get iFrame collection
   * @param payload
   * @returns iFrame Element collection
   */
  const getIFrames = (payload: any) => {
    return containerElement.current?.getElementsByClassName(payload.task.sid);
  };

  /**
   * Show a frame element
   * @param frameCollection collection of frame elements. Should be only one
   */
  const showFrame = (frameCollection: any) => {
    frameCollection[0].setAttribute("style", showContainer);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={containerElement} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default RefContainer;
