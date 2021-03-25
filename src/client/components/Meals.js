import React from "react";
import { Link } from "react-router-dom";

function Meals({ meals }) {
  return (
    <div>
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
