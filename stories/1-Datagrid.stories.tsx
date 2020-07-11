import React from 'react';
import {action} from '@storybook/addon-actions';
import {Datagrid, DatagridHeader, DatagridBody} from "../src";
import "../src/style/index.less";
import {IColumn, IDataItem} from "../src/lib/@interface";

export default {
    title: '@ac/datagrid',
};

export const basic: React.FC = () => {
    const [columns, setColumns] = React.useState<IColumn[]>([]);
    const [data, setData] = React.useState<IDataItem[]>([]);

    const setColumnA = () => {
        setColumns([
            {key: 'name', label: 'name'},
            {key: 'date', label: 'date'},
            {key: 'writer', label: 'writer'},
        ])
    };

    const setColumnB = () => {
        setColumns([
            {key: 'id', label: 'ID'}, {key: 'name', label: 'Name'}
        ])
    };

    React.useEffect(() => {
        setColumns([{key: 'id', label: 'ID'}, {key: 'name', label: 'Name'}]);
        setData([
            {value: {id: '1', name: 'tom'}},
            {value: {id: '2', name: 'seowoo'}}
        ]);
    }, []);

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
        <section>
            <button onClick={setColumnA}>
                setColumn A
            </button>
            <button onClick={setColumnB}>
                setColumn B
            </button>
        </section>
    </div>
}
