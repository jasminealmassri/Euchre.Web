import "./App.css";
import EngineDemo from "./components/EngineDemo";

import { Provider } from "react-redux";
import { store } from "./state/store";

function App() {
  return (
    <Provider store={store}>
      <div className="game">
        <EngineDemo />
      </div>
    </Provider>
  );
}

export default App;
