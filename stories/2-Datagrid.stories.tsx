import React from 'react';
import { action } from '@storybook/addon-actions';
import Datagrid from "../src";

export default {
    title: 'Datagrid',
};

export const basic = () => {
    return <div onClick={action('clicked')}>
        <Datagrid />
    </div>
}
