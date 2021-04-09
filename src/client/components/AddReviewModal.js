import React, { useState } from "react";
import Border from "./Border";

export function AddReviewModal({ mealId, onSuccessReview, onClose }) {
  const [review, setReview] = useState({
    title: "",
    description: "",
    stars: 0,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();

  const submitReview = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...review, meal_id: mealId }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccessReview();
        setSuccess(true);
        setReview((prev) => {
          return {
            ...prev,
            title: "",
            description: "",
            stars: 0,
          };
        });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("There was a POSTing error with review", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="overlay" onClick={(event) => event.stopPropagation()}>
        <Border>
          <h1 className="large-title modal-h1">Add Review</h1>

          {success && (
            <div>
              <h2>Thank you for adding a review.</h2>
              <h3>Consider adding a meal and becoming a host.</h3>

              <button className="button" onClick={onClose}>
                Close
              </button>
            </div>
          )}

          {!success && (
            <form className="form" onSubmit={submitReview}>
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={review.title}
                onChange={(event) => {
                  setReview({
                    ...review,
                    title: event.target.value,
                  });
                }}
                autoFocus={true}
              />
              <br />
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                type="text"
                value={review.description}
                onChange={(event) => {
                  setReview({
                    ...review,
                    description: event.target.value,
                  });
                }}
              />
              <br />

              <label htmlFor="stars">Stars out of 5:</label>
              <input
                id="stars"
                type="number"
                value={review.stars}
                onChange={(event) => {
                  setReview({
                    ...review,
                    stars: event.target.value,
                  });
                }}
              />
              <br />

              <button className="button" type="submit">
                Save review
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
