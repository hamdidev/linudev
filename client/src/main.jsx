import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Main />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
