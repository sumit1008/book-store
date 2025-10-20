export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  price: number;
  genre: Genre;
  inventory: number;
  reviews: Review[];
}

export interface CartItem extends Book {
  quantity: number;
}

export type Genre = 'Fiction' | 'Science Fiction' | 'Fantasy' | 'Mystery' | 'Biography' | 'History' | 'Religious';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}
