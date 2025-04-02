import React, { useEffect, useRef } from "react";

const InfiniteScrollInterSectionObs = ({
  data,
  loading,
  loadmore,
  listItem: ListItemComponent,
  loadingComponent: LoadingComponent,
}) => {
  const listRefs = useRef([]);
  useEffect(() => {
    if (listRefs.current.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadmore();
          observer.unobserve(entries[0].target);
        }
      },
      { rootMargin: "-50px", threshold: 0.5 }
    );
    const lastElement = listRefs.current[listRefs.current.length - 1];
    observer.observe(lastElement);
    return () => {
      observer.unobserve(lastElement);
    };
  }, [data.length]);

  return (
    <>
      {data.map((_, idx) => (
        <ListItemComponent
          key={idx}
          value={idx + 1}
          ref={(el) => (listRefs.current[idx] = el)}
        />
      ))}
      {loading && <LoadingComponent />}
    </>
  );
};

export default InfiniteScrollInterSectionObs;
