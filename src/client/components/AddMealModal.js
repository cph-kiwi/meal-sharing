import React, { useState } from "react";

export function AddMealModal({ onSubmitMeal, show, onClose }) {
  const [meal, setMeal] = useState({
    title: "",
    description: "",
    location: "",
    when: "",
    maxReservations: 0,
    price: 0,
  });

  const onChangeTitle = (event) => {
    setMeal({ ...meal, title: event.target.value });
  };

  const onChangeDescription = (event) => {
    setMeal({ ...meal, description: event.target.value });
  };

  const onChangeLocation = (event) => {
    setMeal({ ...meal, location: event.target.value });
  };

  const onChangeWhen = (event) => {
    setMeal({ ...meal, when: event.target.value });
  };

  const onChangeMaxReservations = (event) => {
    setMeal({ ...meal, maxReservations: event.target.value });
  };

  const onChangePrice = (event) => {
    setMeal({ ...meal, price: event.target.value });
  };

  const submitMeal = (event) => {
    event.preventDefault();
    onSubmitMeal(meal);
    setMeal((prev) => {
      return {
        ...prev,
        title: "",
        description: "",
        location: "",
        when: "",
        maxReservations: 0,
        price: 0,
      };
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
            onChange={onChangeTitle}
            autoFocus={true}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={meal.description}
            onChange={onChangeDescription}
          />

          <br />
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            value={meal.location}
            onChange={onChangeLocation}
          />
          <br />
          <label htmlFor="when">When:</label>
          <input
            id="when"
            type="datetime-local"
            name="when"
            value={meal.when}
            onChange={onChangeWhen}
          />
          <br />
          <label htmlFor="maxReservations">Maximum reservations:</label>
          <input
            id="maxReservations"
            type="number"
            value={meal.maxReservations}
            onChange={onChangeMaxReservations}
          />
          <br />
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            value={meal.price}
            onChange={onChangePrice}
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
