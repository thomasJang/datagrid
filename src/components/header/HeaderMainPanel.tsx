import * as React from "react";
import { useDatagridContext } from "../../context/DatagridContext";
import { useDatagridLayoutContext } from "../../context/DatagridLayoutContext";
import HeaderAsidePanel from "./HeaderAsidePanel";
import HeaderTable from "./HeaderTable";

const HeaderMainPanel: React.FC = () => {
  const context = useDatagridContext();
  const layoutContext = useDatagridLayoutContext();
  const { _bodyWidth, _scrollLeft } = layoutContext;

  const panelScrollRef = React.useRef<HTMLDivElement>(null);

  const lineNumberColumnWidth = React.useMemo(() => {
    return context.enableLineNumber
      ? layoutContext._lineNumberColumnWidth || 50
      : 0;
  }, [context.enableLineNumber, layoutContext._lineNumberColumnWidth]);

  const containerStyle = React.useMemo(
    () => ({
      width: _bodyWidth,
      height: layoutContext._headerHeight,
    }),
    [_bodyWidth, layoutContext._headerHeight]
  );

  React.useEffect(() => {
    if (panelScrollRef.current) {
      panelScrollRef.current.scrollLeft = _scrollLeft;
    }
  }, [_scrollLeft]);

  return (
    <div
      className="ac-datagrid--header--main__panel"
      style={containerStyle}
      ref={panelScrollRef}
    >
      <div data-panel={"scroll-content"}>
        <HeaderAsidePanel />
        <HeaderTable
          columns={context._colGroup}
          lineNumberColumnWidth={lineNumberColumnWidth}
        />
      </div>
    </div>
  );
};

export default React.memo(HeaderMainPanel);
