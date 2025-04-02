import { forwardRef } from "react";

const ItemComponent = forwardRef(({ value }, ref) => {
  return (
    <div ref={ref} className="list-item">
      {value}
    </div>
  );
});

export default ItemComponent;
