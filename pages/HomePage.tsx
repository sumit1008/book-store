
import React, { useState, useMemo } from 'react';
import { useApp } from '../App';
import { BookCard } from '../components/BookCard';
import { Genre } from '../types';
import { GENRES } from '../constants';

export const HomePage: React.FC = () => {
  const { books, searchTerm } = useApp();
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'All'>('All');
  
  const genres: (Genre | 'All')[] = ['All', ...GENRES];

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => selectedGenre === 'All' || book.genre === selectedGenre)
      .filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [books, selectedGenre, searchTerm]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Your Next Adventure</h1>
        <p className="text-lg text-gray-600">Discover worlds, one page at a time.</p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              selectedGenre === genre
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
      
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700">No Books Found</h2>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};
