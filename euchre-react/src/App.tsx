import "./App.css";
import TableComponent from "./components/TableComponent";
import ScoreComponent from "./components/ScoreComponent";
import EuchreComponent from "./components/EuchreComponent";
import EngineDemo from "./components/EngineDemo";

import { Provider } from "react-redux";
import { store } from "./lib/store";

function App() {
  return (
    <Provider store={store}>
      <div className="game">
        <EuchreComponent>
          <ScoreComponent />
          <TableComponent />
        </EuchreComponent>
      </div>
      <div>
        <EngineDemo />
      </div>
    </Provider>
  );
}

export default App;
