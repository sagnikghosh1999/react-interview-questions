import { useState } from "react";
import "./App.css";
import InfiniteScroll from "./components/infinite-scroll";
import InfiniteScrollInterSectionObs from "./components/infinite-scroll-obs";
import LoadingComponent from "./components/loading.component";
import itemComponent from "./components/item.component";

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
      <div className="container">
        <InfiniteScroll
          data={data}
          loadmore={loadmore}
          loading={loading}
          loadingComponent={LoadingComponent}
          listItem={itemComponent}
        />
        {/* <InfiniteScrollInterSectionObs
          data={data}
          loadmore={loadmore}
          loading={loading}
          loadingComponent={LoadingComponent}
          listItem={itemComponent}
        /> */}
      </div>
    </>
  );
}

export default App;
