import { ChangeEvent, useState } from "react";

export default function useInput(initVal: string) {
  const [value, setValue] = useState(initVal);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: _value } = e.target;
    const numericValue = Number(_value);

    if (isNaN(numericValue) || !isFinite(numericValue)) return;
    const [, decimal] = _value.split(".");
    if (decimal?.length > 18) return;

    setValue(_value);
  };

  const clearValue = () => {
    setValue(initVal);
  };

  return { value, onChange, clearValue, setValue };
}
