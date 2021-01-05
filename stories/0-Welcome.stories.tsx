import * as React from "react";
import { linkTo } from "@storybook/addon-links";

export default {
  title: "Welcome",
};

export const ToStorybook = () => (
  <div>
    <h1>Welcome to @a-component/datagrid storybook</h1>
    <p>
      Go to <button onClick={linkTo("datagrid/basic")}>Stories</button>
    </p>
  </div>
);

ToStorybook.story = {
  name: "to Storybook",
};
