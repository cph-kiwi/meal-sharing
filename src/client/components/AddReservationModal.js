import React, { useState } from "react";
import Border from "./Border";

const apiHost = `//${window.location.hostname}:5000/api`;

export function AddReservationModal({ mealId, onSuccessReservation, onClose }) {
  const [reservation, setReservation] = useState({
    number_of_guests: 0,
    contact_phonenumber: "",
    contact_name: "",
    contact_email: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();

  const submitReservation = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiHost}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reservation, meal_id: mealId }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccessReservation();
        setSuccess(true);
        setReservation((prev) => {
          return {
            ...prev,
            number_of_guests: 0,
            contact_phonenumber: "",
            contact_name: "",
            contact_email: "",
          };
        });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("There was a POSTing error with reservation", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" onClick={(event) => event.stopPropagation()}>
        <Border>
          <h1 className="large-title modal-h1">Add Reservation</h1>

          {success && (
            <div>
              <h2>Thank you for adding a reservation.</h2>
              <h3>You are now a guest!</h3>

              <button className="button" onClick={onClose}>
                Close
              </button>
            </div>
          )}

          {!success && (
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
              <label htmlFor="contact_phonenumber">Contact phone number:</label>
              <input
                id="contact_phonenumber"
                type="text"
                value={reservation.contact_phonenumber}
                onChange={(event) => {
                  setReservation({
                    ...reservation,
                    contact_phonenumber: event.target.value,
                  });
                }}
              />
              <br />

              <label htmlFor="contact_name">Contact name:</label>
              <input
                id="contact_name"
                type="text"
                value={reservation.contact_name}
                onChange={(event) => {
                  setReservation({
                    ...reservation,
                    contact_name: event.target.value,
                  });
                }}
              />
              <br />
              <label htmlFor="contact_email">Contact email:</label>
              <input
                id="contact_email"
                type="text"
                value={reservation.contact_email}
                onChange={(event) => {
                  setReservation({
                    ...reservation,
                    contact_email: event.target.value,
                  });
                }}
              />
              <br />

              <button className="button" type="submit">
                Save reservation
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
