import * as React from "react";
import { linkTo } from "@storybook/addon-links";

export default {
  title: "Welcome"
};

export const ToStorybook = () => (
  <div>
    <h1>Welcome to @a-c/datagrid storybook</h1>
    <p>
      Go to <button onClick={linkTo("datagrid")}>Stories</button>
    </p>
  </div>
);

ToStorybook.story = {
  name: "to Storybook"
};
