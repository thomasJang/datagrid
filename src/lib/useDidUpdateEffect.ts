import * as React from "react";

export function useDidUpdateEffect(
  fn: React.EffectCallback,
  deps?: React.DependencyList
): void {
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
