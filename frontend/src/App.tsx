import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { HomePage, BookPage, ContactPage, Login, Dashboard } from './pages';
import Navbar from './containers/navbar';
import Footer from './containers/footer';
import PageLoader from './components/delayPage';

const navItems = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Book',
    path: '/about',
  },
  {
    title: 'Todo',
    path: '/contact',
  },
];

function App() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login';

  return (
    <>
      <Navbar brand={{ first: 'Fou', second: 'Die' }} items={navItems} /> 
      <PageLoader>
        <Routes>
          <Route path="/" element={<HomePage brand={'Culinary Journey'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<BookPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </PageLoader>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
