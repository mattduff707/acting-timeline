import debounce from "lodash.debounce";
import { useEffect, useMemo, useRef } from "react";

const useDebounce = (callback: () => void, delay: number) => {
  const ref: any = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };
    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};

export default useDebounce
