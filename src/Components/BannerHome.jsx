import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const [currentImage, setCurrentImage] = useState(0);

  // Touch tracking states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % bannerData.length);
  };

  const handlePrevious = () => {
    setCurrentImage(
      (prev) => (prev - 1 + bannerData.length) % bannerData.length
    );
  };

  // Handle automatic scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerData]);

  // Handle swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX); // Record the starting touch position
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX); // Update the end touch position
  };

  const handleTouchEnd = () => {
    // Determine swipe direction
    if (touchStart - touchEnd > 50) {
      handleNext(); // Swipe left
    } else if (touchEnd - touchStart > 50) {
      handlePrevious(); // Swipe right
    }
  };
  return (
    <section className="w-full h-full">
      <div
        className="flex min-h-full max-h-[95vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {bannerData.map((data, index) => {
          const mediaType = data.media_type || "movie";
          return (
            <div
              key={data.id + "bannerHome" + index}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
              className="min-h-[450px] transition-transform duration-700 ease-in-out lg:min-h-full min-w-full overflow-hidden relative group"
            >
              <div className="w-full h-full">
                <img
                  src={imageUrl + data.backdrop_path}
                  alt="images"
                  className="h-full w-full object-cover"
                />
              </div>

              {/** Buttons for navigation */}
              <div className="justify-between w-full px-4 h-full items-center absolute top-0 group-hover:lg:flex hidden">
                <button
                  onClick={handlePrevious}
                  className="bg-white text-2xl rounded-full z-10 text-black p-3 shadow-lg lg:p-4"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white text-2xl rounded-full z-10 text-black p-3 shadow-lg lg:p-4"
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="container w-full">
                <div className="mx-auto absolute bottom-4 px-3 max-w-md sm:max-w-xl lg:max-w-2xl">
                  <h2 className="font-bold text-white lg:text-4xl md:text-3xl text-xl drop-shadow-2xl">
                    {data.title || data.name}
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base lg:text-lg line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-5 text-sm md:text-base text-gray-300">
                    <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>Views: {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <Link to={`/details/${mediaType}/${data.id}`}>
                    <button className="bg-white px-4 font-bold py-2 text-black text-sm md:text-md lg:text-lg rounded mt-3 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                      Play Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
