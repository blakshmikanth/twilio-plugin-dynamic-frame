import React from "react";
import * as Flex from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";

import DynamicContainer from "./components/DynamicContainer";

const PLUGIN_NAME = "IframePlugin";

export default class IframePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   *
   * @param flex { typeof Flex }
   * @param manager { Flex.Manager }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    const options: Flex.ContentFragmentProps = { sortOrder: -1 };

    flex.AgentDesktopView.Panel2.Content.remove("container"); // remove the default container
    flex.AgentDesktopView.Panel2.Content.add(<DynamicContainer key="dynamic-container" />, options);
  }
}
