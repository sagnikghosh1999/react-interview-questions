import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const InfiniteScrollVirtualList = ({
  data,
  loading,
  loadmore,
  itemComponent: ItemComponent,
  loadingComponent: LoadingComponent,
  itemHeight = 50,
  containerHeight = 500,
}) => {
  const totalHeight = itemHeight * data.length;
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const itemRefs = useRef(new Map());

  const handleScroll = () => {
    if (!containerRef.current) return;
    setScrollTop(containerRef.current.scrollTop);
  };

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (containerRef.current)
        containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const lastitemRef = useCallback(
    (node) => {
      if (loading || !node) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            loadmore();
            observerRef.current.unobserve(node);
          }
        },
        {
          rootMargin: "-50px",
          threshold: 0.8,
        }
      );
      observerRef.current.observe(node);
    },
    [loading, loadmore]
  );

  const { startIdx, endIdx, visibleData } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 5);
    const end = Math.min(
      data.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + 5
    );
    return {
      startIdx: start,
      endIdx: end,
      visibleData: data.slice(start, end),
    };
  }, [scrollTop, data.length, itemHeight, containerHeight]);
  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight,
        overflowY: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div className="" style={{ height: totalHeight, position: "relative" }}>
        {visibleData.map((item, idx) => {
          return (
            <div
              style={{
                height: itemHeight,
                position: "absolute",
                top: (startIdx + idx) * itemHeight,
                width: "100%",
              }}
              key={idx}
              ref={(el) => {
                if (el) {
                  itemRefs.current.set(startIdx + idx, el);
                  if (idx === visibleData.length - 1) lastitemRef(el);
                } else {
                  itemRefs.current.delete(startIdx + idx);
                }
              }}
            >
              <ItemComponent value={item} />
            </div>
          );
        })}
      </div>
      {loading && <LoadingComponent />}
    </div>
  );
};

export default InfiniteScrollVirtualList;
