import * as React from "react";
import { IDatagridBody, LayoutContextActionTypes } from "../@interface";
import BodyAsidePanel from "./body/BodyAsidePanel";
import BodyLeftPanel from "./body/BodyLeftPanel";
import BodyMainPanel from "./body/BodyMainPanel";
import useIsomorphicLayoutEffect from "../lib/useIsomorphicLayoutEffect";
import { useDatagridContext } from "../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/DatagridLayoutContext";

const DatagridBody: React.FC<IDatagridBody> = props => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();

  const { bodyRowHeight = 20, dataLength } = context;
  const {
    _bodyHeight = 1,
    _bodyWidth = 1,
    _scrollTop,
    _scrollLeft
  } = layoutContext;

  const bodyContentHeight = React.useMemo(() => {
    return dataLength * bodyRowHeight;
  }, [dataLength, bodyRowHeight]);
  const bodyContentWidth = React.useMemo(() => {
    return (context._colGroup || [])
        .map(n => n._width || 0)
        .reduce((acc, cur) => {
          return acc + cur;
        }, 0);
  }, [context._totalWidthOfColumns]);
  const contentScrollContainerWidth = React.useMemo(() => {
    return (
        (layoutContext._bodyWidth || 1) -
        (context.enableLineNumber
            ? layoutContext._lineNumberColumnWidth || 50
            : 0)
    );
  }, [
    layoutContext._bodyWidth,
    layoutContext._lineNumberColumnWidth,
    context.enableLineNumber
  ]);

  const { startRowIndex, endRowIndex, styleTop } = React.useMemo(() => {
    const displayRowCount = Math.floor(_bodyHeight / bodyRowHeight);
    const startRowIndex = Math.floor(_scrollTop / bodyRowHeight);
    const endRowIndex =
      startRowIndex + displayRowCount > dataLength
        ? dataLength
        : startRowIndex + displayRowCount;

    return {
      startRowIndex,
      endRowIndex,
      styleTop: -(_scrollTop % bodyRowHeight)
    };
  }, [_bodyHeight, bodyRowHeight, dataLength, _scrollTop]);

  const styleLeft = React.useMemo(() => {
    return -_scrollLeft;
  }, [_scrollLeft]);

  const onWheel = (evt: WheelEvent) => {
    const delta = {x:0, y:0};
    if (evt.detail) {
      delta.y = evt.detail * 10;
    } else {
      if (typeof evt.deltaY === 'undefined') {
        delta.y = -(evt as any).wheelDelta;
        delta.x = 0;
      } else {
        delta.y = evt.deltaY;
        delta.x = evt.deltaX;
      }
    }
    console.log(delta);

    // 내용의 전체 길이. : bodyContentHeight
    // 내용의 전체 너비 : bodyContentWidth
    // 내용이 표시되는 영역의 길이 : layoutContext._bodyHeight
    // 내용이 표시되는 영역의 너비


    evt.preventDefault();
  }

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      const bodyHeight = containerRef.current.clientHeight;
      const bodyWidth = containerRef.current.clientWidth;

      layoutDispatch({
        type: LayoutContextActionTypes.SET_BODY_DIMENSION,
        bodyHeight,
        bodyWidth
      });
    }
  }, [props.style, context.height, context.headerHeight]);

  React.useEffect(() => {
      containerRef.current?.addEventListener('wheel', onWheel, {passive: false});
    return () => {
      containerRef.current?.removeEventListener('wheel', onWheel);
    }
  }, [])

  return (
    <div ref={containerRef} className="ac-datagrid--body" style={props.style}>
      <BodyAsidePanel
        startRowIndex={startRowIndex}
        endRowIndex={endRowIndex}
        styleTop={styleTop}
      />
      <BodyLeftPanel />
      <BodyMainPanel
        startRowIndex={startRowIndex}
        endRowIndex={endRowIndex}
        styleTop={styleTop}
        styleLeft={styleLeft}
      />
      {props.children}
    </div>
  );
};

export default DatagridBody;
