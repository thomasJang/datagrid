import * as React from "react";
import { IDatagridOptionBar } from "@interface";
import FilterToggle from "./FilterToggle";
import FilterSelector from "./FilterSelector";
import ColorToggle from "./ColorToggle";
import ColorSelector from "./ColorSelector";

const OptionBar: React.FC<IDatagridOptionBar> = () => {
  const [display, setDisplay] = React.useState(false);
  const [display2, setDisplay2] = React.useState(false);

  const onClick = () => {
    setDisplay((prev) => !prev);
  };

  const handleColor = () => {
    setDisplay2((e) => !e);
  };

  return (
    <div className="ac-datagrid--option_bar">
      <ColorToggle onClick={handleColor} />
      <FilterToggle onClick={onClick} />
      {display && <FilterSelector />}
      {display2 && <ColorSelector />}
    </div>
  );
};

export default React.memo(OptionBar);
