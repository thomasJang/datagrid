import * as React from "react";
import { IDatagridOptionBar } from "@interface";
import FilterToggle from "./FilterToggle";
import FilterSelector from "./FilterSelector";
import ColorToggle from "./ColorToggle";
import CustomToggle from "./CustomToggle";
import ColorSelector from "./ColorSelector";
import ColorCustom from "./ColorCustom";

const OptionBar: React.FC<IDatagridOptionBar> = () => {
  const [selectDisplay, setSelectDisplay] = React.useState(false);
  const [customDisplay, setCustomDisplay] = React.useState(false);

  const onClick = () => {
    setSelectDisplay((prev) => !prev);
    if (customDisplay)
      setCustomDisplay((prev) => !prev);
  };
  const onClickCustomBox = () => {
    if (selectDisplay)
      setSelectDisplay((prev) => !prev);
    setCustomDisplay((prev) => !prev);
  };
  const onMouseLeave = () => {
    setSelectDisplay((prev) => !prev);
  };
  const onMouseLeaveCustomBox = () => {
    //setCustomDisplay((prev) => !prev);
  };

  return (
    <div className="ac-datagrid--option_bar">
      <ColorToggle onClick={onClick} />
      {selectDisplay && <ColorSelector onMouseLeave={onMouseLeave} />}
      <CustomToggle onClick={onClickCustomBox} />
      {customDisplay && <ColorCustom onMouseLeave={onMouseLeaveCustomBox} />}
    </div>
  );
};

export default React.memo(OptionBar);
