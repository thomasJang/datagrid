const objectProto = Object.prototype;
const getProto = Object.getPrototypeOf;
const hasOwnProperty = objectProto.hasOwnProperty;
const toString = objectProto.toString;
const symToStringTag =
  typeof Symbol !== "undefined" ? Symbol.toStringTag : undefined;
const fnToString = hasOwnProperty.toString;
const ObjectFunctionString = fnToString.call(Object);
const freeGlobal =
  typeof global === "object" &&
  global !== null &&
  (global as any).Object === Object &&
  global;
const freeSelf =
  typeof self === "object" &&
  self !== null &&
  (self as any).Object === Object &&
  self;
/** Used as a reference to the global object. */
const root = freeGlobal || freeSelf || Function("return this")();

// https://github.com/lodash/lodash/blob/master/.internal/baseGetTag.js
function baseGetTag(value: any) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value);
  }
  const isOwn = hasOwnProperty.call(value, symToStringTag);
  const tag = value[symToStringTag];
  let unmasked = false;
  try {
    value[symToStringTag] = undefined;
    unmasked = true;
  } catch (e) {}

  const result = toString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

// https://github.com/lodash/lodash/blob/master/isObjectLike.js
export function isObjectLike(value: any) {
  return typeof value === "object" && value !== null;
}

// https://github.com/lodash/lodash/blob/master/isObject.js
export function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

// https://github.com/lodash/lodash/blob/master/isFunction.js
export function isFunction(value: any) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  const tag = baseGetTag(value);
  return (
    tag === "[object Function]" ||
    tag === "[object AsyncFunction]" ||
    tag === "[object GeneratorFunction]" ||
    tag === "[object Proxy]"
  );
}

// https://github.com/lodash/lodash/blob/master/isNumber.js
export function isNumber(value: any) {
  return (
    typeof value === "number" ||
    (isObjectLike(value) && baseGetTag(value) === "[object Number]")
  );
}

interface Cancelable {
  cancel(): void;
  flush(): void;
}

interface DebounceSettings {
  /**
   * @see _.leading
   */
  leading?: boolean;
  /**
   * @see _.maxWait
   */
  maxWait?: number;
  /**
   * @see _.trailing
   */
  trailing?: boolean;
}

export function debounce<T extends (...args: any) => any>(
  func: T,
  wait?: number,
  options?: DebounceSettings
): T & Cancelable {
  let lastArgs: any,
    lastThis: any,
    maxWait: any,
    result: any,
    timerId: any,
    lastCallTime: any;

  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    !wait && wait !== 0 && typeof root.requestAnimationFrame === "function";

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +(wait || 0);
  if (options && isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(+(options.maxWait || 0), wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time: any) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(pendingFunc: any, startTimerWait: any) {
    if (useRAF) {
      return root.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, startTimerWait);
  }

  function cancelTimer(id: any) {
    if (useRAF) {
      return root.cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }

  function leadingEdge(time: any) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time: any) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = (wait || 0) - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time: any) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= (wait || 0) ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: any) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timerId !== undefined;
  }

  let debounced: any = function(...args: any[]) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = Function("return this")();
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  };

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced;
}

interface ThrottleSettings {
  /**
   * @see _.leading
   */
  leading?: boolean;
  /**
   * @see _.trailing
   */
  trailing?: boolean;
}

export function throttle<T extends (...args: any) => any>(
  func: T,
  wait?: number,
  options?: ThrottleSettings
): T & Cancelable {
  let leading = true;
  let trailing = true;

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  if (options && isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading: leading,
    maxWait: wait,
    trailing: trailing
  });
}
