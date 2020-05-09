import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes/routes";
import { history } from "./_helpers";

function App() {
  return (
    <Router history={history}>
      <div className="App">
        {routes}
      </div>
    </Router>
  );
}

export default App;
