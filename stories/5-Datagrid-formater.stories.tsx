import * as React from "react";
import { action } from "@storybook/addon-actions";
import "../src/style/index.less";
import { IColumn, IDataItem } from "../src/@interface";
import {
  Datagrid,
  DatagridBody,
  DatagridHeader,
  DatagridHorizontalScroller,
  DatagridVerticalScroller,
} from "../src";

export default {
  title: "datagrid/formater",
};

export const Formater: React.FC = () => {
  const [columns, setColumns] = React.useState<IColumn[]>([]);
  const [data, setData] = React.useState<IDataItem[]>([]);
  const [scrollTop, setScrollTop] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const setColumnA = () => {
    setColumns([
      { key: "name", label: "네임", width: 200 },
      { key: "date", label: "date" },
      { key: "writer", label: "writer", width: 300 },
    ]);
  };

  const setColumnB = () => {
    setColumns([
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
    ]);
  };

  const setColumnFormater = () => {
    setColumns([
      { key: "id", label: "ID"},
      { key: "name", label: "Name", formatter: (args) => {return '*' + args + '*'}},
    ]);
  }

  React.useEffect(() => {
    setColumns([
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
    ]);
    setData([
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
    ]);
  }, []);

  return (
    <div>
      <Datagrid
        width={500}
        height={400}
        headerHeight={28}
        bodyRowHeight={28}
        columns={columns}
        data={data}
        dataLength={data.length}
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
        enableLineNumber
      >
        <DatagridHeader />
        <DatagridBody>
          <DatagridVerticalScroller size={12} />
          <DatagridHorizontalScroller size={12} />
        </DatagridBody>
      </Datagrid>
      <section>
        <button onClick={setColumnA}>setColumn A</button>
        <button onClick={setColumnB}>setColumn B</button>
        <button onClick={setColumnFormater}>setColumn Formater</button>
      </section>
      <section>
        scrollTop :
        <input
          type={"number"}
          value={scrollTop}
          onChange={(e) => setScrollTop(Number(e.target.value))}
        />
        &nbsp; scrollLeft :
        <input
          type={"number"}
          value={scrollLeft}
          onChange={(e) => setScrollLeft(Number(e.target.value))}
        />
      </section>
    </div>
  );
};
