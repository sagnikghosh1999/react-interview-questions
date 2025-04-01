import React, { useEffect, useRef } from "react";

const InfiniteScrollInterSectionObs = ({
  data,
  loading,
  loadmore,
  listItem,
}) => {
  const listRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        loadmore();
      }
    });
    const lastElement = listRefs.current[listRefs.current.length - 1];
    observer.observe(lastElement);
    return () => {
      observer.unobserve(lastElement);
    };
  }, [data.length]);

  return (
    <div>
      <div className="container">
        {data.map((_, idx) => (
          <div
            key={idx}
            ref={(el) => (listRefs.current[idx] = el)}
            className="list-item"
          >
            {idx + 1}
          </div>
        ))}
        {loading && <div className="list-item">Loading...</div>}
      </div>
    </div>
  );
};

export default InfiniteScrollInterSectionObs;
