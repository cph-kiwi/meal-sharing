import React, { useState, useEffect } from "react";
import { AddReviewModal } from "./AddReviewModal";

function Reviews({ mealId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);

  const fetchMyReviews = () => {
    setIsLoading(true);
    fetch(`/api/reviews/?mealId=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        setIsLoading(false);
      })
      .catch((error) =>
        console.log("error.message in Review.js", error.message)
      );
  };

  useEffect(fetchMyReviews, [mealId]);

  return (
    <div>
      {isLoading && (
        <div className="loading-indicator">
          <p>Loading reviews</p>
        </div>
      )}
      <button className="button" onClick={() => setShow(true)}>
        Add review
      </button>

      {show && (
        <AddReviewModal
          mealId={mealId}
          onClose={() => setShow(false)}
          onSuccessReview={fetchMyReviews}
        />
      )}

      <h2>Reviews</h2>

      {reviews.map((review) => (
        <article key={review.id}>
          <h3>{review.title}</h3>
          <p>{review.description}</p>
          <p>Stars out of 5: {review.stars}</p>
        </article>
      ))}
    </div>
  );
}

export default Reviews;
