import "./App.css";
import Euchre from "./components/Euchre";

import { Provider } from "react-redux";
import { store } from "./state/store";

function App() {
  return (
    <Provider store={store}>
      <div className="game">
        <Euchre />
      </div>
    </Provider>
  );
}

export default App;
