import { forwardRef } from "react";

const ItemComponent = forwardRef(({ value }, ref) => {
  console.log("hello");
  return (
    <div ref={ref} className="list-item">
      {value}
    </div>
  );
});

export default ItemComponent;
