import { useEffect, useMemo, useRef, useState } from "react";

const Shape = ({ data }) => {
  const boxes = useMemo(() => data.flat(Infinity), [data]);
  const timerRef = useRef();
  const visibleBoxCount = useMemo(
    () =>
      boxes.reduce((acc, curr) => {
        if (curr === 1) acc++;
        return acc;
      }, 0),
    [boxes]
  );
  const [selected, setSelected] = useState(new Set());
  const [unloading, setUnloading] = useState(false);

  const handleClick = (e) => {
    const { target } = e;
    const status = target.getAttribute("data-status");
    const index = target.getAttribute("data-index");
    if (status !== "visible" || index === null || unloading) return;

    setSelected((prev) => new Set(prev.add(index)));
  };

  const unLoad = () => {
    setUnloading(true);
    const keys = Array.from(selected.keys());
    const removeNextKey = () => {
      if (keys.length > 0) {
        const currentKey = keys.shift();
        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(currentKey);
          return updatedKeys;
        });

        timerRef.current = setTimeout(removeNextKey, 500);
      } else {
        setUnloading(true);
        clearTimeout(timerRef.current);
      }
    };
    timerRef.current = setTimeout(() => {
      removeNextKey();
    }, 100);
  };

  useEffect(() => {
    if (selected.size >= visibleBoxCount) {
      unLoad();
    }
  }, [selected, visibleBoxCount]);

  return (
    <div className="boxes" onClick={handleClick}>
      {boxes.map((box, index) => {
        const status = box === 1 ? "visible" : "hidden";
        const isSelected = selected.has(index.toString());
        return (
          <div
            className={`box ${status} ${isSelected ? "selected" : ""}`}
            key={`${box}-${index}`}
            data-index={index}
            data-status={status}
          ></div>
        );
      })}
    </div>
  );
};

export default Shape;
