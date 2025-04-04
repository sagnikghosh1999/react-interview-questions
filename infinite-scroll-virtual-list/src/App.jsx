import { useState } from "react";
import "./App.css";
import InfiniteScrollVirtualList from "./components/InfiniteScrollVirtuallist";
import Loading from "./components/Loading";
import ListItem from "./components/Listitem";

const TOTAL_ITEMS = 1000; // Total data to simulate
const BATCH_SIZE = 50; // Number of items to load at a time
const VIEWPORT_HEIGHT = 500; // Height of scrollable container

function App() {
  const [data, setData] = useState(
    Array.from({ length: BATCH_SIZE }, (_, i) => i + 1)
  );
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading || data.length >= TOTAL_ITEMS) return;
    setLoading(true);
    setTimeout(() => {
      setData((prevData) => [
        ...prevData,
        ...Array.from(
          { length: BATCH_SIZE },
          (_, i) => prevData.length + i + 1
        ),
      ]);
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="">
      <h1 className="heading"> Virtualized Infinite Scroll</h1>
      <div className="container">
        <InfiniteScrollVirtualList
          data={data}
          loading={loading}
          loadmore={loadMore}
          loadingComponent={Loading}
          itemComponent={ListItem}
        />
      </div>
    </div>
  );
}

export default App;
