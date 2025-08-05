import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage, AboutPage, ContactPage } from './pages';
import Navbar from './containers/navbar';
import Footer from './containers/footer';
import PageLoader from './components/delayPage';

const navItems = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
];

function App() {
  return (
    <>
      <Navbar brand={{ first: 'Fou', second: 'Die' }} items={navItems} /> 
      <PageLoader>
        <Routes>
            <Route path="/" element={<HomePage brand={'Culinary Journey'} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </PageLoader>
      <Footer />
    </>
  );
}

export default App;
