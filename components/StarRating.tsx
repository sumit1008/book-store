
import React from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number;
  setRating?: (rating: number) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, setRating, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating && setRating(star)}
          disabled={!setRating}
          className={`text-yellow-400 ${setRating ? 'cursor-pointer' : ''}`}
        >
          <StarIcon solid={star <= rating} />
        </button>
      ))}
    </div>
  );
};
