import * as React from "react";


interface IPros {
  onClick: () => void;
}


const ColorToggle: React.FC<IPros> = (props) => {
  const { onClick } = props;
  return (
      <div className="ac-datagrid--option_bar__custom_toggle" onClick={onClick} title="customize color-theme" >
        <span>CUSTOM</span>
      </div>
  );
};

export default React.memo(ColorToggle);