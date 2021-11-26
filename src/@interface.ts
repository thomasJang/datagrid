import * as React from "react";

export enum ContextActionTypes {
  SET_STATE = "SET_STATE",
}

export enum LayoutContextActionTypes {
  SET_HOVER = "SET_HOVER",
  SET_SCROLL = "SET_SCROLL",
  SET_SCROLL_TOP = "SET_SCROLL_TOP",
  SET_SCROLL_LEFT = "SET_SCROLL_LEFT",
  SET_LINE_NUMBER_WIDTH = "SET_LINE_NUMBER_WIDTH",
  SET_BODY_DIMENSION = "SET_BODY_DIMENSION",
  SET_HEADER_HEIGHT = "SET_HEADER_HEIGHT",
  SET_BODY_HEIGHT = "SET_BODY_HEIGHT",
  SET_STATE = "SET_STATE",
}

type DataItemType = "C" | "U" | "D";

export interface IDataItem {
  type?: DataItemType;
  value: [] | Record<string, any>;
  changed?: Record<string, any>;
  selected?: boolean;
}

type DataMap = Map<number, IDataItem>;
type DataObj = Record<number, IDataItem>;

export type IData = DataMap | DataObj;

type Direction = "left" | "center" | "right";

export interface IColumn {
  key?: string;
  label?: string;
  width?: number | string;
  align?: Direction | string;
  colSpan?: number;
  rowSpan?: number;
  colIndex?: number;
  rowIndex?: number;
  formatter?: number;
  collector?: number;
  editor?: any;
  _sx?: number;
  _ex?: number;
  _width?: number;
  attr?: string;
  depth?: number;
}

export interface IDatagridCommonProps {
  style?: React.CSSProperties;
}

export interface IDatagridProps extends IDatagridCommonProps {
  cssClassName?: string;
  width: number;
  height: number;
  columns: IColumn[];
  data: IData;
  dataLength: number;
  loading?: boolean;
  loadingData?: boolean;
  selection?: any;
  scrollLeft?: number;
  scrollTop?: number;
  headerHeight?: number;
  headerAlign?: Direction;
  bodyRowHeight?: number;
  bodyAlign?: Direction;
  statusBarHeight?: number;

  enableLineNumber?: boolean;
  lineNumberStartAt?: number;

  enableFrozenCell?: boolean;
  frozenColumnIndex?: number;
  frozenRowIndex?: number;

  enableEditCell?: boolean;
  onScroll?: () => void;
  onClick?: (
    e?: React.MouseEvent,
    value?: any,
    selectedRow?: number,
    selectedCol?: number
  ) => void;
}

export interface IDatagridHeader extends IDatagridCommonProps {}
export interface IDatagridBody extends IDatagridCommonProps {}
export interface IDatagridVerticalScroller extends IDatagridCommonProps {
  size?: number;
}
export interface IDatagridHorizontalScroller extends IDatagridCommonProps {
  width?: number;
  size?: number;
}
export interface IDatagridStatusBar extends IDatagridCommonProps {
  showScroller?: boolean;
  scrollerSize?: number;
}

// local variables
export interface IDatagridContext extends IDatagridProps {
  _ready: boolean;
  _leftColGroup?: IColumn[];
  _colGroup?: IColumn[];
  _totalWidthOfColumns?: number; // 계산된 컬럼들의 너비 합
  _frozenPanelWidth?: number;
}

export interface IDatagridLayoutContext {
  _hover: boolean;
  _scrollLeft: number;
  _scrollTop: number;
  _bodyWidth?: number;
  _bodyHeight?: number;
  _headerHeight?: number;
  _lineNumberColumnWidth?: number;
  _contentScrollContainerWidth?: number;
}
