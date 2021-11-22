
# DataGrid

DataGrid는 누구나 쉽게 대용량 데이터를 엑셀처럼 활용할 수 있는 라이브러리 입니다.
<br/>
더 많은 데이터를 웹에서 직관적이고 빠르게 사용해보세요.
<hr />

### 설치방법

```bash
npm install @a-c/datagrid --save
```

스토리북을 활용하여 컴포넌트를 체험해보세요. 
```bash
npm install
npm run storybook
```

<hr />

## 예제

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
const data   = [
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
많은 속성들을 활용해 여러 타입의 행과 열을 조합할 수 있습니다.
수백만 개의 데이터도 쉽고 편안하게 볼 수 있습니다.

<hr />

## 문서


 
- [개발 히스토리](https://medium.com/chequer/react-datagrid-component-%EC%A0%9C%EC%9E%91%EA%B8%B0-with-es6-typescript-4efcbfe1b442)

- [문의사항][id]
  
[id]: asroq7434@gmail.com "문의사항"
