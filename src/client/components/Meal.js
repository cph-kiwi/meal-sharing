import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AddReservationModal } from "./AddReservationModal";

function Meal({ meals }) {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [show, setShow] = useState(false);

  const params = useParams();
  const meal = meals.find((meal) => meal.id === Number(params.id));

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/api/reservations/?mealId=${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setReservations((prev) => {
          return prev.concat(data);
        });
        setIsLoading(false);
      })
      .catch((error) => console.log("error.message in Meal.js", error.message));
  }, []);

  const numbersOfGuests = reservations.map((reservation) =>
    Number(reservation.number_of_guests)
  );

  const totalReservedSpaces = numbersOfGuests.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <div>
      {!meal ? (
        <div>Not Found</div>
      ) : (
        <div>
          {isLoading && <div>Loading...</div>}
          <h2>{meal.title}</h2>
          <p>{meal.description}</p>
          <p>{meal.when}</p>

          <p>{meal.location}</p>
          <p>Max reservations: {meal.max_reservations}</p>
          <p>
            Seats available:{" "}
            {meal.max_reservations - totalReservedSpaces <= 0 ? (
              <span>Fully booked!</span>
            ) : (
              meal.max_reservations - totalReservedSpaces
            )}
          </p>
          <p>{meal.price}dk</p>
        </div>
      )}

      <button className="button" onClick={() => setShow(true)}>
        Add reservation
      </button>

      <AddReservationModal
        mealId={meal.id}
        show={show}
        onClose={() => setShow(false)}
        onSubmitReservation={(reservation) => {
          //   console.log("reservations before", reservations);
          setShow(false);
          setReservations((prev) => {
            // console.log("reservations after", prev.concat(reservation));
            return prev.concat(reservation);
          });
        }}
      />

      <hr />
      <Link to="/">Go back to home</Link>
    </div>
  );
}

export default Meal;
