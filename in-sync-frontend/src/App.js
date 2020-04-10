import React from "react";
import "./App.css";
import routes from "./routes/routes"
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">{routes}</div>
    </Router>
  );
}

export default App;
