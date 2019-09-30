import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./config/reactotronConfig";

import GlobalStyle from "./styles/global";
import Header from "./components/Header";

import Routes from "./routes";
import hisotry from "./services/history";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router history={hisotry}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={2700} />
      </Router>
    </Provider>
  );
}

export default App;
