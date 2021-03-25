import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// import TestComponent from "./components/TestComponent/TestComponent";
import { AddMealModal } from "./components/AddMealModal";
import Meals from "./components/Meals";
import Meal from "./components/Meal";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "./App.css";

const API = "http://localhost:5000/api/meals";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setMeals((prev) => {
          return prev.concat(data);
        });
        setIsLoading(false);
      })
      .catch((error) => console.log("error.message in App.js", error.message));
  }, []);

  return (
    <div className="app">
      <Nav />
      <h1 className="large-title">Dinner Time</h1>
      <p className="medium-title">A Meal Sharing App</p>
      <p>
        Become a host or a guest, and share delightful dinner times with new
        friends
      </p>

      {isLoading && <div>Loading...</div>}
      <Switch>
        <Route exact path="/" component={Home}>
          <button className="button" onClick={() => setShow(true)}>
            Add meal
          </button>

          <AddMealModal
            show={show}
            onClose={() => setShow(false)}
            onSubmitMeal={(meal) => {
              // console.log("meals before", meals);
              setShow(false);
              setMeals((prev) => {
                // console.log("meals after", prev.concat(meal));
                return prev.concat(meal);
              });
            }}
          />

          <Meals meals={meals} />
        </Route>
        <Route path="/meal/:id" component={() => <Meal meals={meals} />} />
        <Route path="*">
          <div>404 not found</div>
        </Route>
      </Switch>
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

/*

    <Router>
      <Route exact path="/">
        <p>test</p>
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>

*/
