import { useEffect, useRef, useState } from "react";

interface DebouncedInputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  onDebouncedChange: (value: string | number | readonly string[] | undefined) => void;
  debounceDelay?: number;
}

export default function DebouncedInput({ onDebouncedChange, debounceDelay, ...rest }: DebouncedInputProps) {
  const [value, setValue] = useState(rest.defaultValue);
  const [debouncedValue, setDebouncedValue] = useState(rest.defaultValue);
  const prevDebouncedValue = useRef(rest.defaultValue);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceDelay || 300);
    return () => clearTimeout(timeoutId);
  }, [debounceDelay, value]);

  useEffect(() => {
    if (prevDebouncedValue.current !== debouncedValue) {
      onDebouncedChange(debouncedValue);
      prevDebouncedValue.current = debouncedValue;
    }
  }, [debouncedValue, onDebouncedChange]);

  return <input {...rest} onChange={onChangeHandler} />;
}
