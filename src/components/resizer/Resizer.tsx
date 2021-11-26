import * as React from "react";
import { IDatagridOptionBar } from "@interface";

const Resizer: React.FC<IDatagridOptionBar> = () => {
  const [display, setDisplay] = React.useState(false);

  const onClick = () => {
    setDisplay((prev) => !prev);
  };

  return <div>|</div>;
};

export default React.memo(Resizer);
