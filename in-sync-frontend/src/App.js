import React, { useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import routes from "./routes/routes";

import { history } from './_helpers';
import { alertActions } from './_actions';

function App() {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
        // clear alert on location change
        dispatch(alertActions.clear());
    });
  }, []);

  return (
    <div>
      {alert.message &&
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
      <Router>
        <div className="App">
          {routes}
        </div>
      </Router>
    </div>
  );
}

export default App;
