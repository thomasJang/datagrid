import * as React from "react";

interface IProps {}
const Resizer: React.FC<IProps> = () => {
  const [resizerActive, setResizerActive] = React.useState(true);

  return <div className="resizer"></div>;
};

export default React.memo(Resizer);
