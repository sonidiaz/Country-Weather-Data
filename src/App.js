import React from "react";
import HeaderApp from "./components/header";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./redux/store";

import "./App.css";
import "./style.scss";
import "purecss";
import "../node_modules/purecss/build/grids-responsive-min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/:id">
              <HeaderApp />
              <Details />
            </Route>
            <Route path="/">
              <HeaderApp />
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
