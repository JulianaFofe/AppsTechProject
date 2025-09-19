import { useEffect, useState } from 'react';
import { Data } from '../../components/data/dataInfo';

interface Info {
  brand: string;
}

const HomePage = ({ brand }: Info) => {
  const [loadingCards, setLoadingCards] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingCards(false); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="font-serif">
      <div className="text-center mt-10">
        <h1 className="text-5xl text-primary">{brand}</h1>
        <p className="text-xl text-gray-600 mt-4">
          Welcome to <span className="text-primary">Culinary Journey</span>,
          where every recipe tells a story!
          <br />
          Dive into the world of flavors, aromas, and textures as we
          <br />
          explore diverse cuisines from around the globe.
        </p>
      </div>

      <h1 className="text-primary text-center text-4xl mt-20">
        Explore our different Menus
      </h1>

      <div className="flex flex-wrap justify-center mt-4">
        {loadingCards ? (
          <p className="text-2xl text-gray-600 mt-10">Loading...</p>
        ) : (
          Data.map((item) => (
            <div
              key={item.title}
              className="block bg-white shadow-lg p-4 m-4 w-60 text-center rounded-lg"
            >
              <img
                src={`/${item.img}`}
                alt={item.title}
                className="rounded-md w-full h-40 object-cover"
              />
              <p className="mt-4 mb-2 text-black font-bold text-2xl">
                {item.title}
              </p>
              <p className="mb-4 text-black text-lg">{item.description}</p>
              <button className="inline-block rounded bg-primary p-2 text-lg text-white">
                Order 
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
