import * as React from "react";
import { IDatagridOptionBar } from "@interface";
import FilterToggle from "./FilterToggle";
import FilterSelector from "./FilterSelector";
import ColorToggle from "./color/ColorToggle";
import CustomToggle from "./custom/CustomToggle";
import ColorSelector from "./color/ColorSelector";
import ColorCustom from "./custom/ColorCustom";

const OptionBar: React.FC<IDatagridOptionBar> = () => {
  const [selectDisplay, setSelectDisplay] = React.useState(false);
  const [customDisplay, setCustomDisplay] = React.useState(false);

  const onClick = () => {
    setSelectDisplay((prev) => !prev);
    if (customDisplay) setCustomDisplay((prev) => !prev);
  };
  const onClickCustomBox = () => {
    if (selectDisplay) setSelectDisplay((prev) => !prev);
    setCustomDisplay((prev) => !prev);
  };
  const onMouseLeave = () => {
    setSelectDisplay((prev) => !prev);
  };

  return (
    <div className="ac-datagrid--option_bar">
      <ColorToggle onClick={onClick} />
      {selectDisplay && <ColorSelector onMouseLeave={onMouseLeave} />}
      <CustomToggle onClick={onClickCustomBox} />
      {customDisplay && <ColorCustom onClick={onClickCustomBox} />}
    </div>
  );
};

export default React.memo(OptionBar);
