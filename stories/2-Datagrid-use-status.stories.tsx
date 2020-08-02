import * as React from "react";
import { action } from "@storybook/addon-actions";
import "../src/style/index.less";
import { IColumn, IDataItem } from "../src/@interface";
import {
  Datagrid,
  DatagridBody,
  DatagridHeader,
  DatagridHorizontalScroller,
  DatagridVerticalScroller
} from "../src";

export default {
  title: "datagrid"
};

export const UseStatusBar: React.FC = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" }
  ];
  const dataSource = [
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
    { value: { id: "17", name: "seowoo" } }
  ];

  return (
    <div>
      <Datagrid
        width={500}
        height={400}
        headerHeight={28}
        bodyRowHeight={28}
        columns={columns}
        data={dataSource}
        dataLength={dataSource.length}
        enableLineNumber
      >
        <DatagridHeader />
        <DatagridBody>
          <DatagridVerticalScroller size={12} />
          <DatagridHorizontalScroller size={12} />
        </DatagridBody>
      </Datagrid>
    </div>
  );
};
