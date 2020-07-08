import React from 'react';
import {action} from '@storybook/addon-actions';
import {Datagrid, DatagridHeader, DatagridBody} from "../src";
import "../src/style/index.less";

export default {
    title: 'Datagrid',
};

export const basic = () => {
    const columns = [{key: 'id', label: 'ID'}, {key: 'name', label: 'Name'}];
    const data = [
        {value: {id: '1', name: 'tom'}},
        {value: {id: '2', name: 'seowoo'}}
    ]

    return <div>
        <Datagrid
            width={600}
            height={400}
            headerHeight={30}
            columns={columns}
            data={data}
        >
            <DatagridHeader />
            <DatagridBody />
        </Datagrid>
    </div>
}
