const THRESHOLD = 20;

const InfiniteScroll = ({
  data,
  loading,
  loadmore,
  loadingComponent: LoadingComponent,
  listItem: ListItemComponent,
}) => {
  const handleScroll = (e) => {
    const remainingScroll =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;
    if (remainingScroll < THRESHOLD) loadmore();
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        overflowY: "auto",
      }}
      onScroll={handleScroll}
    >
      {data.map((_, idx) => (
        <ListItemComponent key={idx} value={idx + 1} />
      ))}
      {loading && <LoadingComponent />}
    </div>
  );
};

export default InfiniteScroll;
