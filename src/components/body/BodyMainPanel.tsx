import * as React from "react";
import { LayoutContextActionTypes } from "../../@interface";
import { useDatagridContext } from "../../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch,
} from "../../context/DatagridLayoutContext";
import throttle from "lodash.throttle";
import BodyTable from "./BodyTable";

interface IProps {
  startRowIndex: number;
  endRowIndex: number;
  styleTop: number;
  styleLeft: number;
}

const BodyMainPanel: React.FC<IProps> = ({
  startRowIndex,
  endRowIndex,
  styleTop,
  styleLeft,
}) => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();
  const panelScrollRef = React.useRef<HTMLDivElement>(null);
  const {
    _bodyWidth = 1,
    _bodyHeight = 1,
    _scrollLeft,
    _scrollTop,
  } = layoutContext;
  const { dataLength, bodyRowHeight = 20 } = context;

  const lineNumberColumnWidth = React.useMemo(() => {
    return context.enableLineNumber
      ? layoutContext._lineNumberColumnWidth || 50
      : 0;
  }, [context.enableLineNumber, layoutContext._lineNumberColumnWidth]);

  const containerStyle = React.useMemo(
    () => ({
      left: lineNumberColumnWidth,
      width: _bodyWidth - lineNumberColumnWidth,
      height: _bodyHeight,
    }),
    [_bodyWidth, _bodyHeight, lineNumberColumnWidth]
  );

  const bodyContentWidth = React.useMemo(() => {
    return (context._colGroup || [])
      .map((n) => n._width || 0)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
  }, [context._colGroup]);

  const bodyContentHeight = React.useMemo(() => {
    return dataLength * bodyRowHeight;
  }, [dataLength, bodyRowHeight]);

  const contentContainerStyle = React.useMemo(
    () => ({
      top: styleTop,
      left: styleLeft,
      paddingLeft: _scrollLeft,
      paddingTop: _scrollTop,
      height: bodyContentHeight,
      width: bodyContentWidth,
    }),
    [
      styleTop,
      styleLeft,
      _scrollLeft,
      _scrollTop,
      bodyContentHeight,
      bodyContentWidth,
    ]
  );

  const throttledScroll = React.useMemo(
    () =>
      throttle((scrollTop: number, scrollLeft: number) => {
        // check scrollTop, scrollLeft limit
        const contentScrollableHeight = Math.max(
          0,
          bodyContentHeight - _bodyHeight
        );
        const contentScrollableWidth = Math.max(
          0,
          bodyContentWidth - (_bodyWidth - lineNumberColumnWidth)
        );

        if (scrollTop < 0) scrollTop = 0;
        else if (scrollTop > contentScrollableHeight)
          scrollTop = contentScrollableHeight;

        if (scrollLeft < 0) scrollLeft = 0;
        else if (scrollLeft > contentScrollableWidth)
          scrollLeft = contentScrollableWidth;

        layoutDispatch({
          type: LayoutContextActionTypes.SET_SCROLL,
          scrollTop,
          scrollLeft,
        });
      }, 30),
    [
      _bodyHeight,
      _bodyWidth,
      bodyContentHeight,
      bodyContentWidth,
      layoutDispatch,
      lineNumberColumnWidth,
    ]
  );

  const onScroll: React.UIEventHandler<HTMLDivElement> = React.useCallback(() => {
    const scrollTop = panelScrollRef.current?.scrollTop || 0;
    const scrollLeft = panelScrollRef.current?.scrollLeft || 0;
    return throttledScroll(scrollTop, scrollLeft);
  }, [throttledScroll]);

  React.useEffect(() => {
    if (panelScrollRef.current) {
      panelScrollRef.current.scrollTop = _scrollTop;
      panelScrollRef.current.scrollLeft = _scrollLeft;
    }
  }, [_scrollTop, _scrollLeft]);

  if (!context._colGroup || context._colGroup.length < 1) {
    return null;
  }

  return (
    <div
      className="ac-datagrid--body--main__panel"
      style={containerStyle}
      ref={panelScrollRef}
      onScroll={onScroll}
    >
      <div data-panel={"scroll-content"} style={contentContainerStyle}>
        <BodyTable
          columns={context._colGroup}
          startRowIndex={startRowIndex}
          endRowIndex={endRowIndex}
        />
      </div>
    </div>
  );
};

export default React.memo(BodyMainPanel);
