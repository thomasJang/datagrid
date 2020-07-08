import React from 'react';
import { linkTo } from '@storybook/addon-links';

export default {
  title: 'Welcome',
};

export const ToStorybook = () => <div>
  <h1>Welcome to ac-datagrid storybook</h1>
  <p>Go to <a onClick={linkTo('Datagrid')}>Stories</a></p>
</div>;

ToStorybook.story = {
  name: 'to Storybook',
};
