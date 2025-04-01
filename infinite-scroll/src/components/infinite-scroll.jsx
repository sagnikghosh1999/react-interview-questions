import React, { useState } from "react";

const THRESHOLD = 20;

const InfiniteScroll = ({ data, loading, loadmore }) => {
  const handleScroll = (e) => {
    const remainingScroll =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;
    if (remainingScroll < THRESHOLD) loadmore();
  };

  return (
    <div>
      <div className="container" onScroll={handleScroll}>
        {data.map((_, idx) => (
          <div key={idx} className="list-item">
            {idx + 1}
          </div>
        ))}
        {loading && <div className="list-item">Loading...</div>}
      </div>
    </div>
  );
};

export default InfiniteScroll;
