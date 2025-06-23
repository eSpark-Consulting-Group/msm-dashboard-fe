import { useEffect } from "react";

export function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export function getValue(item, keys) {
  if (keys.length === 1) {
    return item[keys[0]];
  }
  let value = item;

  keys.forEach((key) => {
    value = value[key];
  });

  return value;
}
