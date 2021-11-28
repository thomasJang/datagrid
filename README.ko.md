> Languages

[Eng](https://github.com/a-component/datagrid/blob/master/README.md)

<div align="center">

<img src="https://user-images.githubusercontent.com/62472550/143730838-2ab6f7f8-10be-489a-89e5-3117b08ae860.png" width="250" height="250">

</div>

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
<br />

## **🗒예제**

👇 하단의 링크에서 코드를 경험할 수 있습니다. 👇

http://a-component.github.io/datagrid/

<hr />

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

<DatagridVerticalScroller *size*={12} />

<DatagridHorizontalScroller *size*={12} />

</DatagridBody>

</Datagrid>

);

```

<hr />

<br />

## 📈**업데이트**

[0.0.1 ver](https://www.notion.so/Patch-notes-d1f6035d286d4e268bd0515c7869ef39)

<hr />

### 문서

[프로토타입](*https://medium.com/chequer/react-datagrid-component-%EC%A0%9C%EC%9E%91%EA%B8%B0-with-es6-typescript-4efcbfe1b442*)
