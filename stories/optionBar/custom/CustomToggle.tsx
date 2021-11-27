import * as React from "react";
import ColorIcon from "../assets/icons/icon-color.png";

interface IPros {
  onClick: () => void;
}

const ColorToggle: React.FC<IPros> = (props) => {
  const { onClick } = props;
  return (
    <div
      className="ac-datagrid--option_bar__custom_toggle"
      onClick={onClick}
      title="customize color-theme"
    >
      <img src={ColorIcon} />
      <span>CUSTOM</span>
    </div>
  );
};

export default React.memo(ColorToggle);
