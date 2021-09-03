import { useEffect } from "react";

//  componentDidMount hook for React

/**
 * useDidMount hook
 * Calls a function on mount
 *
 * @param {Function} callback Callback function to be called on mount
 */
function useDidMount(callback) {
  useEffect(() => {
    if (typeof callback === "function") {
      callback();
    }
  }, [callback]);
}

export { useDidMount };

// How to use it :
//   function Demo() {
//      useDidMount(function () {
//        console.log("mounted");
//       });
// return null;
// }
// Demo();
