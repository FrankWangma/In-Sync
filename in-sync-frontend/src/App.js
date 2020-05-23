import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes/routes";
import { history } from "./_helpers";
import { alertActions } from './_actions';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location, action) => {
        // clear alert on location change
        dispatch(alertActions.clear());
    });
  }, []);

  return (
    <Router history={history}>
      <div className="App">
        {routes}
      </div>
    </Router>
  );
}

export default App;
