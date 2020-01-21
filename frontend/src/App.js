import React from 'react';
import './App.css';
import IndexPageContainer from "./components/IndexPageContainer";
import Grid from "@material-ui/core/Grid";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import indexReducer from "./reducers/indexReducers";
import { Provider } from "react-redux";

export let store = createStore(indexReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <IndexPageContainer/>
        </Grid>
      </Grid>
    </Provider>
  );
};

export default App;
