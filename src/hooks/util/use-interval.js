import { useState, useEffect } from "react";

export const useInterval = (fn, delay = 1000) => {
  const [sync, setSync] = useState(false);

  useEffect(
    () => {
      setInterval(() => {
        setSync(false);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!sync) {
      fn();
      setSync(true);
    }
  });
};
