# DataGrid

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

## Feature

<br />

### **Theme**

<img src="https://user-images.githubusercontent.com/62472550/143468529-b675483b-e7b2-4667-a740-a861507c033f.gif" width="650" height="500">

<br />

### **Modifying Cell data**

<img src="https://user-images.githubusercontent.com/62472550/143468577-5e0d17b3-f2c6-4b43-a1fa-315efc563226.gif" width="550" height="600">

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

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
];
const data = [
  { value: { id: "1", name: "tom" } },
  { value: { id: "2", name: "seowoo" } },
  { value: { id: "3", name: "seowoo" } },
  { value: { id: "4", name: "seowoo" } },
  { value: { id: "5", name: "seowoo" } },
  { value: { id: "6", name: "seowoo" } },
  { value: { id: "7", name: "seowoo" } },
  { value: { id: "8", name: "seowoo" } },
  { value: { id: "9", name: "seowoo" } },
  { value: { id: "10", name: "seowoo" } },
  { value: { id: "11", name: "seowoo" } },
  { value: { id: "12", name: "seowoo" } },
  { value: { id: "13", name: "seowoo" } },
  { value: { id: "14", name: "seowoo" } },
  { value: { id: "15", name: "seowoo" } },
  { value: { id: "16", name: "seowoo" } },
  { value: { id: "17", name: "seowoo" } },
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
    <DatagridHeader />
    <DatagridBody>
      <DatagridVerticalScroller size={12} />
      <DatagridHorizontalScroller size={12} />
    </DatagridBody>
  </Datagrid>,
  container
);
```

<hr />

## Documentation

- [Development log](https://medium.com/chequer/react-datagrid-component-%EC%A0%9C%EC%9E%91%EA%B8%B0-with-es6-typescript-4efcbfe1b442)

- [Questions][id]

[id]: asroq7434@gmail.com "문의사항"

- [Commit convention](https://www.notion.so/git-commit-convention-54cf3d86e53840c9b8613df73d067267)
