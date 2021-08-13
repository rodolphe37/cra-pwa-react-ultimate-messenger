import { useEffect, useRef } from "react";

// Runs a callback effect atmost one time when a condition becomes true

/**
 * useEffectOnceWhen hook
 *
 * It fires a callback once when a condition is true or become true.
 * Fires the callback at most one time.
 *
 * @param callback The callback to fire
 * @param when The condition which needs to be true
 */
function useEffectOnceWhen(callback, when) {
  const hasRunOnceRef = useRef(false);
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    if (when && !hasRunOnceRef.current) {
      callbackRef.current();
      hasRunOnceRef.current = true;
    }
  }, [when]);
}

export { useEffectOnceWhen };

// How to use it :
// function Demo() {
//   const hasOpenedPage = true;
//   useEffectOnceWhen(() => {
//     console.log("user has opened page");
//   }, hasOpenedPage);
//   return null;
// }
