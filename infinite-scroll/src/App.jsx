import { useState } from "react";
import "./App.css";
import InfiniteScroll from "./components/infinite-scroll";
import InfiniteScrollInterSectionObs from "./components/infinite-scroll-obs";

function App() {
  const arr = [...new Array(40)];

  const [data, setData] = useState(arr);
  const [loading, setLoading] = useState(false);

  const loadmore = () => {
    const newData = [...data, ...new Array(10)];
    setLoading(true);
    setTimeout(() => {
      setData(newData);
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <h1 className="heading">Infinite Scroll</h1>
      {/* <InfiniteScroll data={data} loadmore={loadmore} loading={loading} /> */}
      <InfiniteScrollInterSectionObs
        data={data}
        loadmore={loadmore}
        loading={loading}
      />
    </>
  );
}

export default App;
