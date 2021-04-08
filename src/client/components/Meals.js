import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AddMealModal } from "./AddMealModal";

const apiHost = `//${window.location.hostname}:5000/api`;

const API = `${apiHost}/meals`;

function Meals() {
  const [isLoading, setIsLoading] = useState(true);

  const [meals, setMeals] = useState([]);
  const [show, setShow] = useState(false);

  const fetchMyMeals = () => {
    setIsLoading(true);
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
        setIsLoading(false);
      })
      .catch((error) => console.log("error.message in App.js", error.message));
  };

  useEffect(fetchMyMeals, []);

  return (
    <div>
      {isLoading && (
        <div className="loading-indicator">
          <p>Loading meals</p>
        </div>
      )}
      <button className="button" onClick={() => setShow(true)}>
        Add meal
      </button>

      {show && (
        <AddMealModal
          onClose={() => setShow(false)}
          onSuccessMeal={fetchMyMeals}
        />
      )}

      {meals.map((meal) => (
        <article key={meal.id}>
          <Link to={`/meal/${meal.id}`}>
            <h2>{meal.title}</h2>
          </Link>
          <p>{meal.description}</p>
        </article>
      ))}
    </div>
  );
}

export default Meals;
