import * as React from "react";
import { IDatagridOptionBar } from "@interface";
import FilterToggle from "./FilterToggle";
import FilterSelector from "./FilterSelector";
import ColorToggle from "./ColorToggle";
import ColorSelector from "./ColorSelector";

const OptionBar: React.FC<IDatagridOptionBar> = () => {
  const [display, setDisplay] = React.useState(false);

  const onClick = () => {
    setDisplay((prev) => !prev);
  };

  return (
    <div className="ac-datagrid--option_bar">
      <ColorToggle onClick={onClick} />
      {display && <ColorSelector />}
    </div>
  );
};

export default React.memo(OptionBar);
