import { Book, Genre, Order, User } from './types';

export const GENRES: Genre[] = ['Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Biography', 'History', 'Religious'];

export const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices . . . Would you have done anything different, if you had the chance to undo your regrets?",
    coverImage: "https://picsum.photos/seed/midnightlibrary/400/600",
    price: 1499.00,
    genre: "Fiction",
    inventory: 15,
    reviews: [
      { id: 1, user: "Alice", rating: 5, comment: "A truly thought-provoking read!" },
      { id: 2, user: "Bob", rating: 4, comment: "Enjoyed the concept, very creative." },
    ],
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
    coverImage: "https://picsum.photos/seed/hailmary/400/600",
    price: 1850.00,
    genre: "Science Fiction",
    inventory: 25,
    reviews: [
      { id: 3, user: "Charlie", rating: 5, comment: "My favorite book of the year. A masterpiece of sci-fi." },
    ],
  },
  {
    id: 3,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A great modern classic and the prelude to The Lord of the Rings. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.",
    coverImage: "https://picsum.photos/seed/hobbit/400/600",
    price: 1200.00,
    genre: "Fantasy",
    inventory: 30,
    reviews: [
        { id: 4, user: "Diana", rating: 5, comment: "An absolute classic for all ages." },
        { id: 5, user: "Eve", rating: 5, comment: "The perfect adventure story." },
    ],
  },
   {
    id: 4,
    title: "Gone Girl",
    author: "Gillian Flynn",
    description: "On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne’s fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick’s clever and beautiful wife disappears from their rented McMansion on the Mississippi River. Husband-of-the-Year Nick isn’t doing himself any favors with cringe-worthy daydreams about the slope and shape of his wife’s head, but passages from Amy's diary reveal the alpha-girl perfectionist could have put anyone dangerously on edge.",
    coverImage: "https://picsum.photos/seed/gonegirl/400/600",
    price: 999.00,
    genre: "Mystery",
    inventory: 12,
    reviews: [
      { id: 6, user: "Frank", rating: 5, comment: "The twists are insane! Couldn't put it down." },
    ],
  },
  {
    id: 5,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us? Most books about the history of humanity pursue either a historical or a biological approach, but Dr. Yuval Noah Harari breaks the mold with this highly original book that begins about 70,000 years ago with the appearance of modern cognition.",
    coverImage: "https://picsum.photos/seed/sapiens/400/600",
    price: 2200.00,
    genre: "History",
    inventory: 8,
    reviews: [],
  },
   {
    id: 6,
    title: "Educated: A Memoir",
    author: "Tara Westover",
    description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara’s older brothers became violent.",
    coverImage: "https://picsum.photos/seed/educated/400/600",
    price: 1795.00,
    genre: "Biography",
    inventory: 20,
    reviews: [
        { id: 7, user: "Grace", rating: 5, comment: "Inspirational and heartbreaking. A must-read." },
        { id: 8, user: "Heidi", rating: 4, comment: "A powerful story of resilience." },
    ],
  },
  // FICTION
  {
    id: 7, title: "To Kill a Mockingbird", author: "Harper Lee",
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
    coverImage: "https://picsum.photos/seed/mockingbird/400/600", price: 1099.00, genre: "Fiction", inventory: 22, reviews: []
  },
  {
    id: 8, title: "1984", author: "George Orwell",
    description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
    coverImage: "https://picsum.photos/seed/1984/400/600", price: 1525.00, genre: "Fiction", inventory: 18, reviews: []
  },
  {
    id: 9, title: "The Great Gatsby", author: "F. Scott Fitzgerald",
    description: "A novel about the American dream, unattainable love, and the decadence of the Jazz Age.",
    coverImage: "https://picsum.photos/seed/gatsby/400/600", price: 899.00, genre: "Fiction", inventory: 35, reviews: []
  },
  {
    id: 10, title: "Pride and Prejudice", author: "Jane Austen",
    description: "A romantic novel of manners that charts the emotional development of the protagonist, Elizabeth Bennet.",
    coverImage: "https://picsum.photos/seed/pride/400/600", price: 750.00, genre: "Fiction", inventory: 28, reviews: []
  },
  // SCIENCE FICTION
  {
    id: 11, title: "Dune", author: "Frank Herbert",
    description: "A stunning blend of adventure and mysticism, environmentalism and politics, Dune is a powerful, fanstastical tale that has become a landmark of science fiction.",
    coverImage: "https://picsum.photos/seed/dune/400/600", price: 2000.00, genre: "Science Fiction", inventory: 19, reviews: []
  },
  {
    id: 12, title: "Neuromancer", author: "William Gibson",
    description: "The story of a washed-up computer hacker hired by a mysterious employer to pull off the ultimate hack.",
    coverImage: "https://picsum.photos/seed/neuromancer/400/600", price: 1650.00, genre: "Science Fiction", inventory: 14, reviews: []
  },
  {
    id: 13, title: "Foundation", author: "Isaac Asimov",
    description: "The story of a crumbling galactic empire and a secret society of scientists who quietly rebel.",
    coverImage: "https://picsum.photos/seed/foundation/400/600", price: 1780.00, genre: "Science Fiction", inventory: 21, reviews: []
  },
  {
    id: 14, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams",
    description: "Seconds before Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect.",
    coverImage: "https://picsum.photos/seed/hitchhiker/400/600", price: 1120.00, genre: "Science Fiction", inventory: 50, reviews: []
  },
  // FANTASY
  {
    id: 15, title: "The Name of the Wind", author: "Patrick Rothfuss",
    description: "The story of Kvothe, a magically gifted young man who grows to be the most notorious wizard his world has ever seen.",
    coverImage: "https://picsum.photos/seed/wind/400/600", price: 1899.00, genre: "Fantasy", inventory: 24, reviews: []
  },
  {
    id: 16, title: "A Game of Thrones", author: "George R.R. Martin",
    description: "The first book in A Song of Ice and Fire, a series of epic fantasy novels.",
    coverImage: "https://picsum.photos/seed/got/400/600", price: 2250.00, genre: "Fantasy", inventory: 10, reviews: []
  },
  {
    id: 17, title: "Mistborn: The Final Empire", author: "Brandon Sanderson",
    description: "In a world where ash falls from the sky and mists rule the night, an evil lord has ruled for a thousand years.",
    coverImage: "https://picsum.photos/seed/mistborn/400/600", price: 1945.00, genre: "Fantasy", inventory: 31, reviews: []
  },
  {
    id: 18, title: "American Gods", author: "Neil Gaiman",
    description: "A tale of a war brewing between old and new gods: the traditional gods of biblical and mythological roots from around the world steadily losing believers to an upstart pantheon of gods reflecting society's modern love of money, technology, media, celebrity and drugs.",
    coverImage: "https://picsum.photos/seed/americangods/400/600", price: 1599.00, genre: "Fantasy", inventory: 17, reviews: []
  },
  // MYSTERY
  {
    id: 19, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson",
    description: "A murder mystery, a family saga, a love story, and a financial intrigue combined into one satisfyingly complex and entertainingly atmospheric novel.",
    coverImage: "https://picsum.photos/seed/dragontattoo/400/600", price: 1350.00, genre: "Mystery", inventory: 11, reviews: []
  },
  {
    id: 20, title: "And Then There Were None", author: "Agatha Christie",
    description: "Ten strangers are lured to an isolated island mansion off the Devon coast by a mysterious host.",
    coverImage: "https://picsum.photos/seed/agatha/400/600", price: 950.00, genre: "Mystery", inventory: 40, reviews: []
  },
  {
    id: 21, title: "The Da Vinci Code", author: "Dan Brown",
    description: "A murder inside the Louvre, and clues in Da Vinci paintings, lead to the discovery of a religious mystery protected by a secret society for two thousand years.",
    coverImage: "https://picsum.photos/seed/davinci/400/600", price: 1495.00, genre: "Mystery", inventory: 23, reviews: []
  },
  {
    id: 22, title: "Big Little Lies", author: "Liane Moriarty",
    description: "A tale of three mothers of first-graders whose seemingly perfect lives unravel to the point of murder.",
    coverImage: "https://picsum.photos/seed/lies/400/600", price: 1199.00, genre: "Mystery", inventory: 26, reviews: []
  },
  // BIOGRAPHY
  {
    id: 23, title: "Steve Jobs", author: "Walter Isaacson",
    description: "The exclusive biography of Steve Jobs, based on more than forty interviews with Jobs conducted over two years.",
    coverImage: "https://picsum.photos/seed/jobs/400/600", price: 2500.00, genre: "Biography", inventory: 13, reviews: []
  },
  {
    id: 24, title: "The Diary of a Young Girl", author: "Anne Frank",
    description: "The writings from the Dutch language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands.",
    coverImage: "https://picsum.photos/seed/annefrank/400/600", price: 995.00, genre: "Biography", inventory: 33, reviews: []
  },
  {
    id: 25, title: "Becoming", author: "Michelle Obama",
    description: "An intimate, powerful, and inspiring memoir by the former First Lady of the United States.",
    coverImage: "https://picsum.photos/seed/becoming/400/600", price: 2150.00, genre: "Biography", inventory: 16, reviews: []
  },
  {
    id: 26, title: "I Am Malala", author: "Malala Yousafzai",
    description: "The remarkable tale of a family uprooted by global terrorism, of the fight for girls' education, of a father who, himself a school owner, championed and encouraged his daughter to write and attend school, and of brave parents who have a fierce love for their daughter in a society that prizes sons.",
    coverImage: "https://picsum.photos/seed/malala/400/600", price: 1600.00, genre: "Biography", inventory: 27, reviews: []
  },
  // HISTORY
  {
    id: 27, title: "Guns, Germs, and Steel", author: "Jared Diamond",
    description: "A groundbreaking book that attempts to explain why Eurasian and North African civilizations have survived and conquered others, while arguing against the idea of intellectual, moral, or inherent genetic superiority.",
    coverImage: "https://picsum.photos/seed/guns/400/600", price: 1999.00, genre: "History", inventory: 9, reviews: []
  },
  {
    id: 28, title: "A People's History of the United States", author: "Howard Zinn",
    description: "Presents an alternative to the traditional historical narrative in the United States, focusing on the stories of workers, slaves, immigrants, women, and Native Americans.",
    coverImage: "https://picsum.photos/seed/zinn/400/600", price: 2400.00, genre: "History", inventory: 14, reviews: []
  },
  {
    id: 29, title: "The Wright Brothers", author: "David McCullough",
    description: "The dramatic story-behind-the-story about the courageous brothers who taught the world how to fly: Wilbur and Orville Wright.",
    coverImage: "https://picsum.photos/seed/wright/400/600", price: 1825.00, genre: "History", inventory: 20, reviews: []
  },
  {
    id: 30, title: "SPQR: A History of Ancient Rome", author: "Mary Beard",
    description: "A new look at Roman history from one of the world's foremost classicists, it spans nearly a thousand years of history and challenges the legends and myths that have defined our understanding of ancient Rome.",
    coverImage: "https://picsum.photos/seed/spqr/400/600", price: 2650.00, genre: "History", inventory: 11, reviews: []
  },
  // RELIGIOUS
  {
    id: 31, title: "The Bhagavad Gita", author: "Anonymous",
    description: "A 700-verse Hindu scripture that is part of the epic Mahabharata, a dialogue between Prince Arjuna and his guide Krishna on a variety of philosophical issues.",
    coverImage: "https://picsum.photos/seed/gita/400/600", price: 499.00, genre: "Religious", inventory: 50, reviews: []
  },
  {
    id: 32, title: "The Holy Bible: King James Version", author: "Anonymous",
    description: "An English translation of the Christian Bible for the Church of England, commissioned in 1604 and completed as well as published in 1611 under the sponsorship of James VI and I.",
    coverImage: "https://picsum.photos/seed/bible/400/600", price: 999.00, genre: "Religious", inventory: 45, reviews: []
  },
  {
    id: 33, title: "The Quran", author: "Anonymous",
    description: "The central religious text of Islam, which Muslims believe to be a revelation from God (Allah). It is widely regarded as the finest work in classical Arabic literature.",
    coverImage: "https://picsum.photos/seed/quran/400/600", price: 799.00, genre: "Religious", inventory: 40, reviews: []
  },
  {
    id: 34, title: "The Dhammapada", author: "Anonymous",
    description: "A collection of sayings of the Buddha in verse form and one of the most widely read and best known Buddhist scriptures.",
    coverImage: "https://picsum.photos/seed/dhammapada/400/600", price: 650.00, genre: "Religious", inventory: 35, reviews: []
  },
];

export const MOCK_USERS: User[] = [
    { id: 1, name: "Admin User", email: "admin@example.com", password: "adminpassword", isAdmin: true },
    { id: 2, name: "Regular User", email: "user@example.com", password: "userpassword", isAdmin: false },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: "ORD-123",
        date: "2023-10-26",
        total: 3349.00,
        items: [
            { ...MOCK_BOOKS[0], quantity: 1 },
            { ...MOCK_BOOKS[1], quantity: 1 },
        ]
    }
];
