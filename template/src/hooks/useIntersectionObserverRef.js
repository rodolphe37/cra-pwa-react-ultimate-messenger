import { useEffect, useCallback, useState } from "react";
import { HTMLElementOrNull, CallbackRef } from "../utils/utils";

// A hook to register an intersection observer listener.

const config = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: [0, 1],
};

/**
 *
 * useIntersectionObserverRef hook
 *
 * Returns a mutation observer for a React Ref and fires a callback
 *
 * @param {IntersectionObserverCallback} callback Function that needs to be fired on mutation
 * @param {IntersectionObserverInit} options
 */
function useIntersectionObserverRef(callback, options = config) {
  const { root = null, rootMargin, threshold } = options;

  const [node, setNode] = useState < HTMLElementOrNull > null;

  useEffect(() => {
    // Create an observer instance linked to the callback function
    if (node) {
      const observer = new IntersectionObserver(callback, options);

      // Start observing the target node for configured mutations
      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    }
  }, [node, callback, root, rootMargin, threshold, options]);

  const ref = useCallback(
    (node) => {
      setNode(node);
    },
    [setNode]
  );

  return [ref];
}

export { useIntersectionObserverRef };

//  How use it :
// function Demo() {
//   const [isVisible, setIsVisible] = useState(false);
//   const callback = (entries) => {
//     if (entries && entries[0]) {
//       setIsVisible(entries[0].isIntersecting);
//     }
//   };
//   const [myRef] = useIntersectionObserverRef(callback);
//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           right: 0,
//         }}
//       >
//         <h1>Is rectangle visible - {String(isVisible)}</h1>
//       </div>
//       <div style={{ height: 2000 }}></div>
//       <div ref={myRef} style={{ height: 300, background: "red" }}></div>
//       <div style={{ height: 2000 }}></div>
//     </>
//   );
//   return null;
// }
