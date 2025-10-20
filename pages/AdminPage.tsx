import React, { useState } from 'react';
import { useApp } from '../App';
import { Book, Genre, Review } from '../types';
import { GENRES } from '../constants';

const BookForm: React.FC<{ book?: Book; onSave: (book: Book) => void; onCancel: () => void }> = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Book, 'reviews' | 'id'>>(book || {
    title: '', author: '', description: '', coverImage: 'https://picsum.photos/400/600',
    price: 0, genre: 'Fiction', inventory: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'inventory' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: book?.id || Date.now(), reviews: book?.reviews || [] as Review[] });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{book ? 'Edit Book' : 'Add New Book'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="p-2 border rounded bg-white" />
        <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required className="p-2 border rounded bg-white" />
      </div>
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded mb-4 bg-white" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input name="coverImage" value={formData.coverImage} onChange={handleChange} placeholder="Cover Image URL" required className="p-2 border rounded bg-white" />
        <select name="genre" value={formData.genre} onChange={handleChange} className="p-2 border rounded bg-white">
          {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required min="0" step="0.01" className="p-2 border rounded bg-white" />
        <input type="number" name="inventory" value={formData.inventory} onChange={handleChange} placeholder="Inventory" required min="0" className="p-2 border rounded bg-white" />
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};

export const AdminPage: React.FC = () => {
  const { currentUser, books, addBook, updateBook, deleteBook } = useApp();
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);
  const [isAdding, setIsAdding] = useState(false);

  if (!currentUser?.isAdmin) {
    return <div className="text-center py-10 text-red-500 font-bold">Access Denied. Admins only.</div>;
  }

  const handleSave = (book: Book) => {
    if (isAdding) {
      addBook(book);
    } else {
      updateBook(book.id, book);
    }
    setEditingBook(undefined);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setEditingBook(undefined);
    setIsAdding(true);
  };
  
  const handleCancel = () => {
    setEditingBook(undefined);
    setIsAdding(false);
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel: Book Management</h1>
        <button onClick={handleAddNew} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-full hover:bg-indigo-700">Add New Book</button>
      </div>

      {(isAdding || editingBook) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <BookForm book={editingBook} onSave={handleSave} onCancel={handleCancel} />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Cover</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Author</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Inventory</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4"><img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover rounded"/></td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{book.title}</th>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">₹{book.price.toFixed(2)}</td>
                <td className="px-6 py-4">{book.inventory}</td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <button onClick={() => setEditingBook(book)} className="font-medium text-indigo-600 hover:underline">Edit</button>
                  <button onClick={() => window.confirm(`Delete ${book.title}?`) && deleteBook(book.id)} className="font-medium text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
