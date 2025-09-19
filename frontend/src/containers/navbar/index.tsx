import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/button';

export interface NavbarProps {
  brand: BrandColor;
  items: NavbarItem[];
  className?: string;
}

export interface NavbarItem {
  title: string;
  path: string;
}

export interface BrandColor {
  first: string;
  second: string;
}

const Navbar = ({ brand, items }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-amber-500 relative">
      {/* Brand */}
      <div className="font-bold">
        <span className="text-black text-3xl">{brand.first}</span>
        <span className="text-red-700 text-3xl">{brand.second}</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex text-xl gap-10">
        <ul className="flex gap-10 text-xl">
          {items.map((item) => (
            <li key={item.path}>
              <Link
                className="p-4 hover:bg-[#AA1A1A] rounded-xl cursor-pointer"
                to={item.path}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-4">
          <Link to="/login">
            <Button
              className="border border-red-700 text-red-700 py-1 px-7 rounded-sm"
              title="Login"
            />
          </Link>
        </div>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden text-3xl cursor-pointer" onClick={toggleMenu}>
        ☰
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-amber-500 flex flex-col items-center gap-6 py-6 md:hidden shadow-lg z-50">
          <ul className="flex flex-col gap-4 text-xl">
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  className="p-2 hover:bg-[#AA1A1A] rounded-xl cursor-pointer block text-center"
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 w-1/2">
            <Link to= '/login'>
              <Button
                className="border border-red-700 text-red-700 py-2 rounded-sm"
                title="Login"
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
