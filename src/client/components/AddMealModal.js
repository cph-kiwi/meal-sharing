import React, { useState } from "react";
import Border from "./Border";

export function AddMealModal({ onSuccessMeal, onClose }) {
  const [meal, setMeal] = useState({
    title: "",
    description: "",
    location: "",
    when: "",
    max_reservations: 0,
    price: 0,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();

  const submitMeal = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meal),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccessMeal();
        setSuccess(true);
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
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("There was a POSTing error with meal", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" onClick={(event) => event.stopPropagation()}>
        <Border>
          <h1 className="large-title modal-h1">Add Meal</h1>

          {success && (
            <div>
              <h2>Thank you for adding a meal.</h2>
              <h3>You are now a host!</h3>

              <button className="button" onClick={onClose}>
                Close
              </button>
            </div>
          )}

          {!success && (
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
              {error && <p>{error}</p>}
              <button className="button" onClick={onClose}>
                Close
              </button>
            </form>
          )}
        </Border>
      </div>
    </div>
  );
}
