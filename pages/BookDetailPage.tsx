import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../App';
import { StarRating } from '../components/StarRating';
import { SparklesIcon } from '../components/Icons';
import { generateBookSummary } from '../services/geminiService';

export const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { books, addToCart, addReview, currentUser } = useApp();
  
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  const book = books.find(b => b.id === parseInt(bookId || ''));

  if (!book) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Book not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const averageRating = book.reviews.length > 0
    ? book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length
    : 0;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      addReview(book.id, {
        id: Date.now(),
        user: currentUser.name,
        rating: newRating,
        comment: newComment,
      });
      setNewComment('');
      setNewRating(5);
    } else {
      alert("Please login and write a comment to submit a review.");
    }
  };

  const handleGenerateSummary = async () => {
    setIsLoadingSummary(true);
    setSummaryError('');
    setAiSummary('');
    try {
      const summary = await generateBookSummary(book.description);
      setAiSummary(summary);
    } catch (error: any) {
      setSummaryError(error.message);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3">
          <img src={book.coverImage} alt={book.title} className="w-full rounded-lg shadow-2xl" />
        </div>
        <div className="lg:w-2/3">
          <span className="text-indigo-600 font-semibold">{book.genre}</span>
          <h1 className="text-4xl font-bold mt-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mt-1">by {book.author}</p>
          <div className="flex items-center mt-4 space-x-2">
            <StarRating rating={averageRating} />
            <span className="text-gray-600">({book.reviews.length} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-gray-800 my-6">₹{book.price.toFixed(2)}</p>
          <p className="text-gray-700 leading-relaxed">{book.description}</p>
          
          <div className="mt-6">
            <button
                onClick={() => {
                  addToCart(book);
                  alert(`${book.title} added to cart!`);
                }}
                className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg"
            >
              Add to Cart
            </button>
          </div>
          
          <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
             <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2"><SparklesIcon className="text-indigo-500" /> AI-Powered Summary</h3>
                 <button
                    onClick={handleGenerateSummary}
                    disabled={isLoadingSummary}
                    className="text-sm bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full hover:bg-indigo-200 disabled:opacity-50 disabled:cursor-wait"
                 >
                   {isLoadingSummary ? 'Generating...' : 'Generate'}
                 </button>
             </div>
             {isLoadingSummary && <p className="mt-2 text-sm text-gray-500">Thinking...</p>}
             {summaryError && <p className="mt-2 text-sm text-red-600">{summaryError}</p>}
             {aiSummary && <p className="mt-2 text-gray-600 text-sm leading-relaxed">{aiSummary}</p>}
          </div>

        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold border-b pb-4 mb-8">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                {book.reviews.length > 0 ? (
                    <div className="space-y-6">
                    {book.reviews.map(review => (
                        <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{review.user}</span>
                            <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p>No reviews yet. Be the first to write one!</p>
                )}
            </div>
            <div>
                <div className="bg-white p-6 rounded-lg shadow-lg sticky top-28">
                    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                    <form onSubmit={handleAddReview}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Your Rating</label>
                            <StarRating rating={newRating} setRating={setNewRating} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="comment" className="block text-sm font-medium mb-1">Your Comment</label>
                            <textarea
                                id="comment"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                placeholder={currentUser ? "Share your thoughts..." : "Please log in to leave a review."}
                                disabled={!currentUser}
                            ></textarea>
                        </div>
                        <button type="submit" disabled={!currentUser} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700 disabled:bg-gray-400">
                           {currentUser ? 'Submit Review' : 'Login to Review'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
