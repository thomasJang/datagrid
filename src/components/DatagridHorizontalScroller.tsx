import React, { useEffect, useMemo, useRef } from "react";
import { IDatagridHorizontalScroller } from "@interface";
import { useDatagridContext } from "../context/DatagridContext";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/DatagridLayoutContext";
import debounce from "lodash.debounce";

const DatagridHorizontalScroller: React.FC<IDatagridHorizontalScroller> = ({
  style,
  width,
  size = 12
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();
  const { _scrollLeft } = layoutContext;

  const [barX, setBarX] = React.useState(0);
  const [barWidth, setBarWidth] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [enable, setEnable] = React.useState(false);
  const [scrollActive, setScrollActive] = React.useState(false);

  const contentScrollContainerWidth = useMemo(() => {
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
  const bodyContentWidth = useMemo(() => {
    return (context._colGroup || [])
      .map(n => n._width || 0)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
  }, [context._totalWidthOfColumns]);
  const styles: React.CSSProperties = {
    ...style,
    width: "100%",
    height: size
  };

  const handleActiveScrollBar: React.MouseEventHandler<HTMLDivElement> = ev => {
    ev.preventDefault();
    const _scrollLeft = layoutContext._scrollLeft;
    const startClientX = ev.clientX;
    const mouseMove = debounce((evt: MouseEvent) => {
      let newBarX = _scrollLeft + evt.clientX - startClientX;

      // check limit
      if (newBarX < 0) {
        newBarX = 0;
      } else if (newBarX + barWidth > containerWidth) {
        newBarX = containerWidth - barWidth;
      }

      // convertScrollY
      const barScrollableWidth = containerWidth - barWidth;
      const contentScrollableWidth =
        bodyContentWidth - contentScrollContainerWidth;

      const scrollLeft =
        (contentScrollableWidth * newBarX) / barScrollableWidth;

      layoutDispatch({
        type: "SET_SCROLL_LEFT",
        scrollLeft: scrollLeft
      });
    });
    const mouseMoveEnd = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseMoveEnd);
      document.removeEventListener("mouseleave", mouseMoveEnd);

      setScrollActive(false);
    };
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseMoveEnd);
    document.addEventListener("mouseleave", mouseMoveEnd);

    setScrollActive(true);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const _containerWidth = containerRef.current.clientWidth;

    let _barWidth =
      (contentScrollContainerWidth * _containerWidth) / bodyContentWidth;

    if (_barWidth < 10) {
      _barWidth = 10;
    }
    setContainerWidth(_containerWidth);
    setEnable(_barWidth < _containerWidth);
    setBarWidth(_barWidth);
  }, [containerWidth, bodyContentWidth]);

  useEffect(() => {
    if (!containerRef.current) return;
    const _containerWidth = containerRef.current.clientWidth;
    const barScrollableWidth = _containerWidth - barWidth;
    const contentScrollableWidth =
      bodyContentWidth - contentScrollContainerWidth;

    setBarX((barScrollableWidth * _scrollLeft) / (contentScrollableWidth || 1));
  }, [_scrollLeft, barWidth]);

  return (
    <div
      ref={containerRef}
      className={"ac_datagrid--scroller"}
      data-scroller={"horizontal"}
      style={styles}
    >
      {enable && (
        <div
          data-scroll-bar={"horizontal"}
          className={layoutContext._hover || scrollActive ? "active" : ""}
          style={{ width: barWidth, left: barX }}
          onMouseDown={handleActiveScrollBar}
        />
      )}
    </div>
  );
};

export default React.memo(DatagridHorizontalScroller);
