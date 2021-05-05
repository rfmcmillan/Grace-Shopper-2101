import React from 'react';
import timeAgo from 'node-time-ago';

const Reviews = ({ reviews }) => {
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
                  When:
                  {timeAgo(review.createdAt)}
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
