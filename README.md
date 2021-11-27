# DataGrid

#### Languages

[한국어](https://github.com/axis-42/datagrid/blob/docs/README.ko.md)

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@a-c/datagrid
[npm-url]: https://www.npmjs.com/package/@a-c/datagrid
[download-image]: https://img.shields.io/npm/dw/@a-c/datagrid
[download-url]: https://www.npmjs.com/package/@a-c/datagrid

Data Grid is a library that anyone can easily use large amounts of data as easily and quickly as Excel on the web.
<br/>
Use more data intuitively and quickly on the web.

<hr />

### Installation

```bash
npm install @a-c/datagrid --save
```

you can try our library by storybook

```bash
npm install
npm run storybook
```

<hr />

## Example

```js
import React from "react";
import ReactDOM from "react-dom";
import {
  Datagrid,
  DatagridHeader,
  DatagridBody,
  DatagridHorizontalScroller,
  DatagridVerticalScroller,
} from "@a-c/datagrid";

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
    <DatagridHeader />
    <DatagridBody>
      <DatagridVerticalScroller size={12} />
      <DatagridHorizontalScroller size={12} />
    </DatagridBody>
  </Datagrid>
);
```

You can try to enjoy our library below link
<br />
https://github.com/a-component/datagrid.git

[![Edit axui-datagrid-ex](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/affectionate-boyd-r3y7r?fontsize=14&hidenavigation=1&theme=dark)

<hr />

## **Patch notes**

[1.0.0 ver](https://www.notion.so/innohack/1-0-0-ver-2021-11-28-e4cdac234ee946489804e06f476ce881)

<hr />

## Documentation

- [Development log](https://medium.com/chequer/react-datagrid-component-%EC%A0%9C%EC%9E%91%EA%B8%B0-with-es6-typescript-4efcbfe1b442)

- [Commit convention](https://www.notion.so/git-commit-convention-54cf3d86e53840c9b8613df73d067267)
