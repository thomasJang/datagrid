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
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "date", label: "Date", formatter: "date" },
    ]);
  };

  React.useEffect(() => {
    setColumns([
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "date", label: "Date" },
    ]);
    const date = new Date();
    setData([
      { value: { id: "1", name: "tom", date: date } },
      { value: { id: "2", name: "seowoo", date: date } },
      { value: { id: "3", name: "seowoo", date: date } },
      { value: { id: "4", name: "seowoo", date: date } },
      { value: { id: "4", name: "seowoo", date: date } },
      { value: { id: "5", name: "seowoo", date: date } },
      { value: { id: "6", name: "seowoo", date: date } },
      { value: { id: "7", name: "seowoo", date: date } },
      { value: { id: "8", name: "seowoo", date: date } },
      { value: { id: "9", name: "seowoo", date: date } },
      { value: { id: "10", name: "seowoo", date: date } },
      { value: { id: "11", name: "seowoo", date: date } },
      { value: { id: "12", name: "seowoo", date: date } },
      { value: { id: "13", name: "seowoo", date: date } },
      { value: { id: "14", name: "seowoo", date: date } },
      { value: { id: "15", name: "seowoo", date: date } },
      { value: { id: "16", name: "seowoo", date: date } },
      { value: { id: "17", name: "seowoo", date: date } },
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
