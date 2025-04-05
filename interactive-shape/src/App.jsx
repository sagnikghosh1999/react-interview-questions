import "./App.css";
import Shape from "./components/Shape";
import { BOXT_DATA } from "./constants/data";

function App() {
  return (
    <main>
      <Shape data={BOXT_DATA} />
    </main>
  );
}

export default App;
