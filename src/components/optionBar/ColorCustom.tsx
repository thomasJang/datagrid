import * as React from "react";
import { ThemeContextActionTypes } from "../../@interface";

interface IPros {
  onMouseLeave: () => void;
}

const ColorCustom: React.FC<IPros> = (props) => {
  const { onMouseLeave } = props;

  return (
    <div className="ac-datagrid--option_bar__custom_selector" onMouseLeave={onMouseLeave}>
      <ul className="color_selector__list">
        <li className="color_selector__item">
          lulu
        </li>
      </ul>
    </div>
  );
};

export default React.memo(ColorCustom);
