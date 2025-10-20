
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types';
import { StarRating } from './StarRating';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const averageRating = book.reviews.length > 0
    ? book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
      <Link to={`/book/${book.id}`} className="block">
        <div className="relative">
          <img src={book.coverImage} alt={book.title} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            ₹{book.price.toFixed(2)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate" title={book.title}>{book.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{book.author}</p>
          <div className="flex items-center justify-between">
            <StarRating rating={averageRating} />
            <span className="text-xs text-gray-500">{book.reviews.length} review{book.reviews.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
