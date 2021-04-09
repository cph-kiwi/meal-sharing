import React from "react";
import { Route, Switch } from "react-router-dom";
// import TestComponent from "./components/TestComponent/TestComponent";

import Meals from "./components/Meals";
import Meal from "./components/Meal";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Nav />
      <div className="main-body">
        <h1 className="large-title">Dinner Time</h1>
        <p className="medium-title">A Meal Sharing App</p>
        <p>
          Become a host or a guest, and share delightful dinner times with new
          friends
        </p>

        <Switch>
          <Route exact path="/" component={Home}>
            <Meals />
          </Route>
          <Route path="/meal/:id" component={() => <Meal />} />
          <Route path="*">
            <div>404 not found</div>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;
