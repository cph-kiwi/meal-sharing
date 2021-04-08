import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AddReservationModal } from "./AddReservationModal";
import Reviews from "./Reviews";

const apiHost = `//${window.location.host}:5000/api`;

function Meal() {
  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [meal, setMeal] = useState();
  const [show, setShow] = useState(false);

  const params = useParams();

  function formatDate(date) {
    return `${date.slice(0, 10)} ${date.slice(11, 16)}`;
  }

  const fetchMyReservations = () => {
    fetch(`${apiHost}/reservations/?mealId=${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
        setIsLoading(false);
      })
      .catch((error) => console.log("error.message in Meal.js", error.message));
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(`${apiHost}/meals/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setMeal(data);
        setIsLoading(false);
      })
      .catch((error) => console.log("error.message in Meal.js", error.message));

    fetchMyReservations();
  }, [params.id]);

  const numbersOfGuests = reservations.map((reservation) =>
    Number(reservation.number_of_guests)
  );

  const totalReservedSpaces = numbersOfGuests.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <div>
      {isLoading && (
        <div className="loading-indicator">
          <p>Loading meal</p>
        </div>
      )}

      {!isLoading && !meal && <div>Not Found</div>}

      {!isLoading && meal && (
        <div>
          <h2>{meal.title}</h2>
          <p>{meal.description}</p>
          <p>{formatDate(meal.when)}</p>

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

          {meal.when > new Date().toISOString() ? (
            meal.max_reservations - totalReservedSpaces <= 0 ? null : (
              <button className="button" onClick={() => setShow(true)}>
                Add reservation
              </button>
            )
          ) : (
            <Reviews mealId={params.id} />
          )}
        </div>
      )}

      {meal && show && (
        <AddReservationModal
          mealId={meal.id}
          onClose={() => setShow(false)}
          onSuccessReservation={fetchMyReservations}
        />
      )}

      <hr />
      <Link to="/">Go back to home</Link>
    </div>
  );
}

export default Meal;
