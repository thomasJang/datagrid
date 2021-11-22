# @a-component/datagrid

React Datagrid Component

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@a-c/datagrid

[npm-url]: https://www.npmjs.com/package/@a-c/datagrid

[download-image]: https://img.shields.io/npm/dw/@a-c/datagrid

[download-url]: https://www.npmjs.com/package/@a-c/datagrid

[comment]: <> (## Example)

[comment]: <> (link to gh-page for storybook)

## Example

http://a-component.github.io/datagrid/

## Install

```bash
$ npm install @a-c/datagrid --save
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Datagrid,
    DatagridHeader,
    DatagridBody,
    DatagridHorizontalScroller,
    DatagridVerticalScroller,
} from '@a-c/datagrid';

const columns = [
    {key: "id", label: "ID"},
    {key: "name", label: "Name"},
];
const data = [
    {value: {id: "1", name: "tom"}},
    {value: {id: "2", name: "seowoo"}},
    {value: {id: "3", name: "seowoo"}},
    {value: {id: "4", name: "seowoo"}},
    {value: {id: "5", name: "seowoo"}},
    {value: {id: "6", name: "seowoo"}},
    {value: {id: "7", name: "seowoo"}},
    {value: {id: "8", name: "seowoo"}},
    {value: {id: "9", name: "seowoo"}},
    {value: {id: "10", name: "seowoo"}},
    {value: {id: "11", name: "seowoo"}},
    {value: {id: "12", name: "seowoo"}},
    {value: {id: "13", name: "seowoo"}},
    {value: {id: "14", name: "seowoo"}},
    {value: {id: "15", name: "seowoo"}},
    {value: {id: "16", name: "seowoo"}},
    {value: {id: "17", name: "seowoo"}},
];

ReactDOM.render(
    <Datagrid
        width={500}
        height={400}
        headerHeight={28}
        bodyRowHeight={28}
        columns={columns}
        data={data}
        dataLength={data.length}
        enableLineNumber
    >
        <DatagridHeader/>
        <DatagridBody>
            <DatagridVerticalScroller size={12}/>
            <DatagridHorizontalScroller size={12}/>
        </DatagridBody>
    </Datagrid>
    , container);
```

## Development

```bash
$ npm install
$ npm run storybook
```