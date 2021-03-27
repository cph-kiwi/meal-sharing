import React, { useState } from "react";

export function AddReservationModal({
  mealId,
  onSubmitReservation,
  show,
  onClose,
}) {
  const [reservation, setReservation] = useState({
    number_of_guests: 0,
    phone_number: "",
    name: "",
    email: "",
  });

  const submitReservation = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...reservation, meal_id: mealId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onSubmitReservation(reservation);
        setReservation((prev) => {
          return {
            ...prev,
            number_of_guests: 0,
            phone_number: "",
            name: "",
            email: "",
          };
        });
      })
      .catch((error) => {
        console.log(
          "There was a POSTing error with reservation",
          error.message
        );
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" onClick={(event) => event.stopPropagation()}>
        <h1 className="large-title">Add Reservation</h1>
        <form className="form" onSubmit={submitReservation}>
          <label htmlFor="number_of_guests">Number of guests:</label>
          <input
            id="number_of_guests"
            type="number"
            value={reservation.number_of_guests}
            onChange={(event) => {
              setReservation({
                ...reservation,
                number_of_guests: event.target.value,
              });
            }}
            autoFocus={true}
          />
          <br />
          <label htmlFor="phone_number">Contact phone number:</label>
          <input
            id="phone_number"
            type="text"
            value={reservation.phone_number}
            onChange={(event) => {
              setReservation({
                ...reservation,
                phone_number: event.target.value,
              });
            }}
          />
          <br />

          <label htmlFor="name">Contact name:</label>
          <input
            id="name"
            type="text"
            value={reservation.name}
            onChange={(event) => {
              setReservation({ ...reservation, name: event.target.value });
            }}
          />
          <br />
          <label htmlFor="email">Contact email:</label>
          <input
            id="email"
            type="text"
            value={reservation.email}
            onChange={(event) => {
              setReservation({ ...reservation, email: event.target.value });
            }}
          />
          <br />

          <button className="button" type="submit">
            Save reservation
          </button>
        </form>
      </div>
    </div>
  );
}
