> Languages

- [한국어](https://github.com/a-component/datagrid/blob/docs/README.ko.md)

<p align="center">
<img src="https://user-images.githubusercontent.com/62472550/143730838-2ab6f7f8-10be-489a-89e5-3117b08ae860.png"  width="250" height="250">
</p>

<div align="center">

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url]
[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

[npm-image]: https://img.shields.io/npm/v/@a-c/datagrid
[npm-url]: https://www.npmjs.com/package/@a-c/datagrid
[download-image]: https://img.shields.io/npm/dw/@a-c/datagrid
[download-url]: https://www.npmjs.com/package/@a-c/datagrid

</div>

Data Grid is a library that anyone can easily use large amounts of data as easily and quickly as Excel on the web.
<br/>
Use more data intuitively and quickly on the web.

<hr />

## **⚙️Installation**

```bash
npm install @a-c/datagrid --save
```

you can try our library by storybook

```bash
npm install
npm run storybook
```

<hr />

## **🗒Example**

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

👇 You can try to enjoy our library below link 👇
<br />
https://github.com/a-component/datagrid.git

<hr />

## **📈Patch notes**

[0.0.1 ver](https://www.notion.so/Patch-notes-d1f6035d286d4e268bd0515c7869ef39)

<hr />

### Documentation

- [Prototype](https://medium.com/chequer/react-datagrid-component-%EC%A0%9C%EC%9E%91%EA%B8%B0-with-es6-typescript-4efcbfe1b442)
