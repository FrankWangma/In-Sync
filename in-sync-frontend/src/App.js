import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <Router>
      <div className="App">
        {routes}
      </div>
    </Router>
  );
}

export default App;
