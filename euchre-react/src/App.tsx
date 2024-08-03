import "./App.css";
import EngineDemo from "./components/EngineDemo";

import { Provider } from "react-redux";
import { store } from "./state/store";
import EuchreComponent from "./components/EuchreComponent";
import ScoreComponent from "./components/ScoreComponent";
import TableComponent from "./components/TableComponent";

function App() {
  return (
    <Provider store={store}>
       {/* <div className="game">
        <EuchreComponent>
          <ScoreComponent />
          <TableComponent />
        </EuchreComponent>
      </div> */}
      <div className="game">
        <EngineDemo />
      </div>
    </Provider>
  );
}

export default App;
