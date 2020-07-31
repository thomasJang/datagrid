import * as React from "react";

const useIsomorphicLayoutEffect =
  window?.document?.createElement !== undefined
    ? React.useLayoutEffect
    : React.useEffect;

export default useIsomorphicLayoutEffect;
