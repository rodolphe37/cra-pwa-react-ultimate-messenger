import { useEffect, useRef } from "react";

// componentDidUpdate hook for react

/**
 *  useDidUpdate hook
 *
 *  Fires a callback on component update
 *  Can take in a list of conditions to fire callback when one of the
 *  conditions changes
 *
 * @param {Function} callback The callback to be called on update
 * @param {Array} conditions The list of variables which trigger update when they are changed
 * @returns {undefined}
 */
function useDidUpdate(callback, conditions) {
  const hasMountedRef = useRef(false);
  if (typeof conditions !== "undefined" && !Array.isArray(conditions)) {
    conditions = [conditions];
  } else if (Array.isArray(conditions) && conditions.length === 0) {
    console.warn(
      "Using [] as the second argument makes useDidUpdate a noop. The second argument should either be `undefined` or an array of length greater than 0."
    );
  }
  useEffect(() => {
    if (hasMountedRef.current) {
      callback();
    } else {
      hasMountedRef.current = true;
    }
  }, [conditions, callback]);
}

export { useDidUpdate };

// How to use it :
// function Demo() {
//   const [value, setValue] = useState(0);
//   const [hasUpdated, setHasUpdated] = useState(false);
//   useDidUpdate(() => {
//     console.log("Update");
//     setHasUpdated(true);
//   }, [value]);
//   return (
//     <>
//       <button onClick={() => setValue(value + 1)}>Value is {value}</button>
//       <p>Has updated - {hasUpdated.toString()}</p>
//       <p>Please check the console for logs.</p>
//     </>
//   );
// }
