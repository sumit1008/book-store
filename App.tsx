import React, { useState, createContext, useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Book, CartItem, User, Review } from './types';
import { MOCK_BOOKS, MOCK_USERS } from './constants';

interface AppContextType {
  books: Book[];
  cart: CartItem[];
  currentUser: User | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateCartQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  login: (email: string, password: string) => User | null;
  register: (name: string, email: string, password: string) => User | null;
  logout: () => void;
  addReview: (bookId: number, review: Review) => void;
  addBook: (book: Book) => void;
  updateBook: (bookId: number, updatedBook: Book) => void;
  deleteBook: (bookId: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useApp();
    if (!currentUser || !currentUser.isAdmin) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const addToCart = (book: Book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const updateCartQuantity = (bookId: number, quantity: number) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === bookId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const login = (email: string, password: string): User | null => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
        setCurrentUser(user);
        return user;
    }
    return null;
  };

  const register = (name: string, email: string, password: string): User | null => {
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return null; // User already exists
    }
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
      isAdmin: false,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };
  
  const logout = () => {
    setCurrentUser(null);
  };
  
  const addReview = (bookId: number, review: Review) => {
    setBooks(prevBooks => prevBooks.map(book =>
      book.id === bookId ? { ...book, reviews: [...book.reviews, review] } : book
    ));
  };

  // Admin functions
  const addBook = (book: Book) => {
    setBooks(prev => [...prev, { ...book, id: Date.now() }]);
  };
  
  const updateBook = (bookId: number, updatedBook: Book) => {
    setBooks(prev => prev.map(b => (b.id === bookId ? updatedBook : b)));
  };

  const deleteBook = (bookId: number) => {
    setBooks(prev => prev.filter(b => b.id !== bookId));
  };

  const contextValue: AppContextType = {
    books, cart, currentUser, searchTerm, setSearchTerm,
    addToCart, removeFromCart, updateCartQuantity, clearCart,
    login, register, logout, addReview,
    addBook, updateBook, deleteBook
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/book/:bookId" element={<BookDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={
              currentUser ? <CheckoutPage /> : <Navigate to="/login" replace />
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
