import { useState, useEffect, ChangeEvent, useCallback, useMemo } from "react";

// Input hook for React.

const defaultOptions = {};

/**
 *
 * useInput Hook
 *
 * Handles an input's value and onChange props internally to
 * make text input creation process easier
 *
 * @param {any} [initialValue=""] Initial value of the input
 * @param {Options} [opts={}] Options object
 * @returns {InputHandler} Input handler with value and onChange
 */
function useInput(initialValue = "", options = defaultOptions) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      let shouldUpdate = true;
      if (typeof options.validate === "function") {
        shouldUpdate = options.validate(newValue, value);
      }
      if (shouldUpdate) {
        setValue(newValue);
      }
    },
    [value, options]
  );

  // sync with default value
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handler = {
    onChange,
    value,
  };

  return handler;
}

export { useInput };
