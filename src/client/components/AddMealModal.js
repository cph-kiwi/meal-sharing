import React, { useState } from "react";

export function AddMealModal({ onSubmitMeal, show, onClose }) {
  const [meal, setMeal] = useState({
    title: "",
    description: "",
    location: "",
    when: "",
    max_reservations: 0,
    price: 0,
  });

  const submitMeal = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meal),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onSubmitMeal();
        setMeal((prev) => {
          return {
            ...prev,
            title: "",
            description: "",
            location: "",
            when: "",
            max_reservations: 0,
            price: 0,
          };
        });
      })
      .catch((error) => {
        console.log("There was a POSTing error with meal", error.message);
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" onClick={(event) => event.stopPropagation()}>
        <h1 className="large-title">Add Meal</h1>
        <form className="form" onSubmit={submitMeal}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={meal.title}
            onChange={(event) => {
              setMeal({ ...meal, title: event.target.value });
            }}
            autoFocus={true}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={meal.description}
            onChange={(event) => {
              setMeal({ ...meal, description: event.target.value });
            }}
          />

          <br />
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            value={meal.location}
            onChange={(event) => {
              setMeal({ ...meal, location: event.target.value });
            }}
          />
          <br />
          <label htmlFor="when">When:</label>
          <input
            id="when"
            type="datetime-local"
            name="when"
            value={meal.when}
            onChange={(event) => {
              setMeal({ ...meal, when: event.target.value });
            }}
          />
          <br />
          <label htmlFor="max_reservations">Maximum reservations:</label>
          <input
            id="max_reservations"
            type="number"
            value={meal.max_reservations}
            onChange={(event) => {
              setMeal({ ...meal, max_reservations: event.target.value });
            }}
          />
          <br />
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            value={meal.price}
            onChange={(event) => {
              setMeal({ ...meal, price: event.target.value });
            }}
          />
          <br />

          <button className="button" type="submit">
            Save meal
          </button>
        </form>
      </div>
    </div>
  );
}
