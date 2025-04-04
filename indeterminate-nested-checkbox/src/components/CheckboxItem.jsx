import React, { useEffect, useRef } from "react";
import { STATUS } from "../constants/constants";

const CheckboxItem = ({ label, id, status, handleChange }) => {
  const checkboxRef = useRef(null);
  useEffect(() => {
    if (status === STATUS.INDETERMINATE) {
      checkboxRef.current.indeterminate = true;
    } else {
      checkboxRef.current.indeterminate = false;
    }
  }, [status]);

  return (
    <div>
      <input
        type="checkbox"
        ref={checkboxRef}
        name={id}
        id={id}
        checked={status === STATUS.CHECKED}
        onChange={() => handleChange(id)}
        style={{ margin: "0 0.5rem" }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckboxItem;
