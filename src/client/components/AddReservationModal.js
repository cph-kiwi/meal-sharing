import React, { useState } from "react";

export function AddReservationModal({
  mealId,
  onSubmitReservation,
  show,
  onClose,
}) {
  const [reservation, setReservation] = useState({
    numberOfGuests: 0,
    mealId: mealId,
    phoneNumber: "",
    name: "",
    email: "",
  });

  const onChangeNumberOfGuests = (event) => {
    setReservation({ ...reservation, numberOfGuests: event.target.value });
  };

  const onChangePhoneNumber = (event) => {
    setReservation({ ...reservation, phoneNumber: event.target.value });
  };

  const onChangeName = (event) => {
    setReservation({ ...reservation, name: event.target.value });
  };

  const onChangeEmail = (event) => {
    setReservation({ ...reservation, email: event.target.value });
  };

  const submitReservation = (event) => {
    event.preventDefault();
    onSubmitReservation(reservation);
    setReservation((prev) => {
      return {
        ...prev,
        numberOfGuests: 0,
        mealId: mealId,
        phoneNumber: "",
        name: "",
        email: "",
      };
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
          <label htmlFor="numberOfGuests">Number of guests:</label>
          <input
            id="numberOfGuests"
            type="number"
            value={reservation.numberOfGuests}
            onChange={onChangeNumberOfGuests}
            autoFocus={true}
          />
          <br />
          <label htmlFor="phoneNumber">Contact phone number:</label>
          <input
            id="phoneNumber"
            type="number"
            value={reservation.phoneNumber}
            onChange={onChangePhoneNumber}
          />
          <br />

          <label htmlFor="name">Contact name:</label>
          <input
            id="name"
            type="text"
            value={reservation.name}
            onChange={onChangeName}
          />
          <br />
          <label htmlFor="email">Contact email:</label>
          <input
            id="email"
            type="text"
            value={reservation.email}
            onChange={onChangeEmail}
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
