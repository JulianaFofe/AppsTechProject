/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Book {
  key: string;
  title: string;
  author_name: string;
  cover_i?: number;
}

const BookPage = () => {
  const [jsBooks, setJsBooks] = useState<Book[]>([]);
  const [pythonBooks, setPythonBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // FETCH JavaScript books
        const jsResponse = await fetch('https://openlibrary.org/search.json?q=javascript');
        const jsData = await jsResponse.json();
        setJsBooks(jsData.docs);

        // AXIOS Python books
        const pythonResponse = await axios.get('https://openlibrary.org/search.json?q=python');
        setPythonBooks(pythonResponse.data.docs);
      } catch (err) {
        setError('Failed to fetch books.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading books...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-5">JavaScript Books</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {jsBooks.map((book) => (
          <div key={book.key} className="border p-3 rounded shadow">
            <Link to={`/book/${book.key.split('/').pop()}`}>
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : 'https://via.placeholder.com/150'
                }
                alt={book.title}
              />
              <h2 className="mt-2 font-semibold ">{book.title}</h2>
              <p className='mt-3 font-light'>This book was written by {book.author_name}</p>
            </Link>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-center mt-10 mb-5">Python Books</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pythonBooks.map((book) => (
          <div key={book.key} className="border p-3 rounded shadow">
            <Link to={`/book/${book.key.split('/').pop()}`}>
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : 'https://via.placeholder.com/150'
                }
                alt={book.title}
              />
              <h2 className="mt-2 font-semibold">{book.title}</h2>
              <p className='mt-3 font-light'>This book was written by {book.author_name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookPage;
