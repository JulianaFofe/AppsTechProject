import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageLoaderProps {
  children: React.ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Show loading screen on route change

    const timer = setTimeout(() => {
      setLoading(false); // Hide loading screen after 3s
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on route change
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default PageLoader;
