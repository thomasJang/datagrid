import React, { useEffect, useMemo, useRef } from "react";
import { IDatagridVerticalScroller } from "@interface";
import {
  useDatagridLayoutContext,
  useDatagridLayoutDispatch
} from "../context/DatagridLayoutContext";
import { useDatagridContext } from "../context/DatagridContext";
import { debounce } from "../lib/utils";

const DatagridVerticalScroller: React.FC<IDatagridVerticalScroller> = ({
  style,
  size = 12
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const layoutDispatch = useDatagridLayoutDispatch();
  const { _bodyHeight: scrollContainerHeight, _scrollTop } = layoutContext;

  const [containerHeight, setContainerHeight] = React.useState<
    number | undefined
  >(undefined);
  const [barY, setBarY] = React.useState(0);
  const [barHeight, setBarHeight] = React.useState(0);
  const [scrollActive, setScrollActive] = React.useState(false);

  const bodyContentHeight = useMemo(() => {
    return context.dataLength * (context.bodyRowHeight || 1);
  }, [context.dataLength, context.bodyRowHeight]);
  const styles: React.CSSProperties = {
    ...style,
    width: size,
    height: scrollContainerHeight
  };

  const handleActiveScrollBar: React.MouseEventHandler<HTMLDivElement> = ev => {
    ev.preventDefault();
    const _scrollTop = layoutContext._scrollTop;
    const startClientY = ev.clientY;
    const mouseMove = debounce((evt: MouseEvent) => {
      if (!scrollContainerHeight) return;
      let newBarY = _scrollTop + evt.clientY - startClientY;

      // check limit
      if (newBarY < 0) {
        newBarY = 0;
      } else if (newBarY + barHeight > scrollContainerHeight) {
        newBarY = scrollContainerHeight - barHeight;
      }

      // convertScrollY
      const barScrollableHeight = scrollContainerHeight - barHeight;
      const contentScrollableHeight =
        bodyContentHeight - (layoutContext._bodyHeight || 0);
      const scrollTop =
        (contentScrollableHeight * newBarY) / barScrollableHeight;

      layoutDispatch({
        type: "SET_SCROLL",
        scrollTop,
        scrollLeft: layoutContext._scrollLeft
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
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, [scrollContainerHeight]);

  useEffect(() => {
    if (scrollContainerHeight) {
      const _barHeight =
        (scrollContainerHeight * scrollContainerHeight) / bodyContentHeight;
      setBarHeight(_barHeight > 10 ? _barHeight : 10);
    }
  }, [containerHeight]);

  useEffect(() => {
    if (scrollContainerHeight) {
      const barScrollableHeight = scrollContainerHeight - barHeight;
      const contentScrollableHeight =
        bodyContentHeight - (layoutContext._bodyHeight || 0);
      setBarY((barScrollableHeight * _scrollTop) / contentScrollableHeight);
    }
  }, [_scrollTop, barHeight]);

  return (
    <div
      ref={containerRef}
      className={"ac_datagrid--scroller"}
      data-scroller={"vertical"}
      style={styles}
    >
      <div
        data-scroll-bar={"vertical"}
        className={scrollActive ? "active" : ""}
        style={{ height: barHeight, top: barY }}
        onMouseDown={handleActiveScrollBar}
      />
    </div>
  );
};

export default React.memo(DatagridVerticalScroller);
