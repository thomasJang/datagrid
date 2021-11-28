# DataGrid

#### Languages

[한국어](https://github.com/axis-42/datagrid/blob/docs/README.ko.md)

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

DataGrid는 누구나 쉽게 대용량 데이터를 엑셀처럼 쉽고 빠르게 활용할 수 있는 라이브러리 입니다.

<br/>

더 많은 데이터를 웹에서 직관적이고 빠르게 사용해보세요.

<hr />

## **⚙️설치방법**

```bash
npm install @a-c/datagrid --save
```

스토리북을 활용해 더 쉽고 빠르게 사용해보세요.

```bash
npm install
npm run storybook
```

<hr />

## **🗒예제**

```js
import React from "react";
import ReactDOM from "react-dom";
import {✏️
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

> 하단의 링크에서 코드를 경험할 수 있습니다.
> <br /> > https://github.com/a-component/datagrid.git

[![Edit axui-datagrid-ex](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/affectionate-boyd-r3y7r?fontsize=14&hidenavigation=1&theme=dark)

<hr />

## **📈업데이트**

[1.0.0 ver](https://www.notion.so/innohack/1-0-0-ver-2021-11-28-e4cdac234ee946489804e06f476ce881)

<hr />

### 문서

> - [개발 히스토리](https://medium.com/chequer/react-datagrid-component-%EC%A0%9C%EC%9E%91%EA%B8%B0-with-es6-typescript-4efcbfe1b442)

> - [커밋 컨벤션](https://www.notion.so/git-commit-convention-54cf3d86e53840c9b8613df73d067267)
