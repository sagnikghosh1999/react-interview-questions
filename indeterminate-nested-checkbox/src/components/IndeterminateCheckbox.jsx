import React from "react";
import CheckboxItem from "./CheckboxItem";

const IndeterminateCheckbox = ({ checkboxData, handleChange }) => {
  return (
    <div style={{ margin: "0 auto" }}>
      {checkboxData?.map((node, index) => {
        return (
          <div style={{ padding: "0.25rem", marginLeft: "1rem" }} key={index}>
            <CheckboxItem
              label={node.label}
              id={node.id}
              status={node.status}
              handleChange={handleChange}
            />
            {node?.children?.length > 0 && (
              <IndeterminateCheckbox
                checkboxData={node.children}
                handleChange={handleChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IndeterminateCheckbox;
