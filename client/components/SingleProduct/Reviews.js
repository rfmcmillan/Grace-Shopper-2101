import React from 'react';

const Reviews = ({ reviews }) => {
  console.log(reviews);
  return (
    <div>
      {reviews.length ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id} className="review;">
                <div>
                  Text:
                  {review.text}
                  Rating:
                  {review.rating}
                  User:
                  {`${review.user.firstName} ${review.user.lastName}`}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No Reviews</div>
      )}
    </div>
  );
};

export default Reviews;
