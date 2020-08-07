import * as React from "react";
import "../src/style/index.less";
import {
  ContextActionTypes,
  LayoutContextActionTypes
} from "../src/@interface";
import { DatagridVerticalScroller } from "../src";
import {
  DatagridProvider,
  useDatagridContext,
  useDatagridDispatch
} from "../src/context/DatagridContext";
import {
  DatagridLayoutProvider,
  useDatagridLayoutDispatch
} from "../src/context/DatagridLayoutContext";

export default {
  title: "datagrid"
};

const Component: React.FC = () => {
  const context = useDatagridContext();
  const dispatch = useDatagridDispatch();
  const layoutDispatch = useDatagridLayoutDispatch();

  React.useEffect(() => {
    dispatch({
      type: ContextActionTypes.SET_STATE,
      state: {
        _ready: true,
        width: 500,
        height: 500,
        columns: [],
        data: [],
        dataLength: 100,
        bodyRowHeight: 28,
        headerHeight: 0,
        statusBarHeight: 0,
        scrollTop: 0,
        scrollLeft: 0,
        enableLineNumber: true,
        _leftColGroup: [],
        _colGroup: [],
        _totalWidthOfColumns: 200
      }
    });

    layoutDispatch({
      type: LayoutContextActionTypes.SET_STATE,
      state: {
        _scrollTop: 0,
        _scrollLeft: 0,
        _hover: false,
        _lineNumberColumnWidth: 50,
        _headerHeight: 0,
        _bodyWidth: 500,
        _bodyHeight: 500
      }
    });
  }, []);

  return (
    <div
      className={"ac-datagrid"}
      style={{
        width: 500,
        height: 500,
        position: "relative",
        border: "1px solid #ccc"
      }}
    >
      <DatagridVerticalScroller size={10} />
    </div>
  );
};

export const VerticalScroller: React.FC = () => {
  return (
    <DatagridProvider>
      <DatagridLayoutProvider>
        <Component />
      </DatagridLayoutProvider>
    </DatagridProvider>
  );
};
