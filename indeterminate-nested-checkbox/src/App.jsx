import { treeData } from "./constants/data.js";
import "./App.css";
import IndeterminateCheckbox from "./components/IndeterminateCheckbox.jsx";
import { useState } from "react";
import { STATUS } from "./constants/constants.js";

function App() {
  const [checkboxState, setCheckboxState] = useState(treeData);

  const computeStatus = (node) => {
    let checkedCount = 0;
    let uncheckedCount = 0;

    if (!node.children || !(node.children.length > 0)) return;
    node.children.forEach((child) => {
      if (child.status === STATUS.CHECKED) checkedCount++;
      if (child.status === STATUS.UNCHECKED) uncheckedCount++;
    });

    if (checkedCount === node.children.length) node.status = STATUS.CHECKED;
    else if (uncheckedCount === node.children.length)
      node.status = STATUS.UNCHECKED;
    else node.status = STATUS.INDETERMINATE;
  };

  const traverse = (targetId, node, isDecendent, ancestorStatus) => {
    if (targetId === node.id) {
      if (node.status === STATUS.CHECKED) node.status = STATUS.UNCHECKED;
      else node.status = STATUS.CHECKED;
    }

    if (isDecendent) {
      node.status = ancestorStatus;
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        traverse(
          targetId,
          child,
          node.id === targetId || isDecendent,
          node.status
        );
      });
    }

    computeStatus(node);
  };

  const handleChange = (targetId) => {
    const cloneCheckboxState = JSON.parse(JSON.stringify(checkboxState));
    cloneCheckboxState.forEach((node) => {
      traverse(targetId, node);
    });

    setCheckboxState(cloneCheckboxState);
  };
  return (
    <>
      <h1 className="heading">Indeterminate Nested Checkbox</h1>
      <div className="container">
        <IndeterminateCheckbox
          checkboxData={checkboxState}
          handleChange={handleChange}
        />
      </div>
    </>
  );
}

export default App;
