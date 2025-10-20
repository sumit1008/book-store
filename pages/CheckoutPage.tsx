import React from 'react';
import { useApp } from '../App';
import { Link, useNavigate } from 'react-router-dom';

export const CheckoutPage: React.FC = () => {
  const { cart, currentUser, clearCart } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const gst = cart.reduce((sum, item) => {
    if (item.genre === 'Religious') {
      return sum; // 0% tax for religious books
    }
    return sum + (item.price * item.quantity * 0.18);
  }, 0);

  const total = subtotal + gst;
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleConfirmPurchase = () => {
    alert(`Thank you for your purchase, ${currentUser?.name}!\nYour order has been confirmed.`);
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
        <div className="text-center py-10">
            <h2 className="text-2xl font-bold">Your cart is empty.</h2>
            <p className="text-gray-600 my-2">There's nothing to check out.</p>
            <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Continue Shopping</Link>
        </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-6" id="print-area">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">Order Summary</h1>
                <div className="mb-6">
                    <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Billed To:</strong> {currentUser?.name} ({currentUser?.email})</p>
                </div>

                <div className="divide-y divide-gray-200">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between py-4">
                            <div className="flex items-center">
                                <img src={item.coverImage} alt={item.title} className="w-16 h-24 object-cover rounded-md mr-4"/>
                                <div>
                                    <p className="font-semibold">{item.title}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 border-t pt-6 space-y-3">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>GST (18%)</span>
                        <span>₹{gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            <div className="max-w-3xl mx-auto mt-8 flex justify-between no-print">
                <button
                    onClick={handlePrint}
                    className="bg-gray-500 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition-colors"
                >
                    Print Order
                </button>
                <button
                    onClick={handleConfirmPurchase}
                    className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-full hover:bg-indigo-700 transition-colors"
                >
                    Confirm Purchase
                </button>
            </div>
        </div>
    </div>
  );
};
