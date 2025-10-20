import React from 'react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, currentUser } = useApp();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const gst = cart.reduce((sum, item) => {
    if (item.genre === 'Religious') {
      return sum; // 0% tax for religious books
    }
    return sum + (item.price * item.quantity * 0.18);
  }, 0);

  const total = subtotal + gst;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
              <ul className="divide-y divide-gray-200">
                {cart.map(item => (
                  <li key={item.id} className="flex items-center py-6">
                    <img src={item.coverImage} alt={item.title} className="w-24 h-36 object-cover rounded-md" />
                    <div className="ml-6 flex-grow">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-sm text-gray-500">{item.author}</p>
                      <p className="text-lg font-bold text-indigo-600 mt-2">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                        className="border rounded-md px-2 py-1"
                      >
                        {[...Array(Math.min(10, item.inventory)).keys()].map(n => (
                          <option key={n + 1} value={n + 1}>{n + 1}</option>
                        ))}
                      </select>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-semibold">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
                <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
                <div className="space-y-4 my-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-4">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                {currentUser ? (
                   <Link
                    to="/checkout"
                    className="w-full text-center block bg-indigo-600 text-white font-bold py-3 rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full text-center block bg-gray-500 text-white font-bold py-3 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    Login to Checkout
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
