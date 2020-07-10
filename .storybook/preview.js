import './style.less';

import { addParameters } from '@storybook/react'; // <- or your storybook framework

addParameters({
    backgrounds: [
        { name: 'light', value: '#fbfbfb', default: true },
        { name: 'dark', value: '#888' },
    ],
});