import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { useState } from "react";

const BannerHome = () => {
  const BannerData = useSelector((state) => state.movieData.bannerData) || [];
  const imageUrl = useSelector((state) => state.movieData.imageUrl) || "";
  const [currentImg, setCurrentImg] = useState(1);

  // Debugging logs
  console.log("BannerData:", BannerData);
  console.log("BannerData length:", BannerData.length);
  console.log("Current Image Index:", currentImg);

  const handleNext = () => {
    if (BannerData.length < 0 && currentImg < BannerData.length - 1) {
      setCurrentImg((prev) => {
        const newIndex = prev + 1;
        console.log("Next clicked, new index:", newIndex);
        return newIndex;
      });
    } else {
      console.log("Next: Cannot go further, at the last image or no data");
    }
  };

  const handlePrevious = () => {
    if (currentImg > 0) {
      setCurrentImg((prev) => {
        const newIndex = prev - 1;
        console.log("Previous clicked, new index:", newIndex);
        return newIndex;
      });
    } else {
      console.log("Previous: Cannot go back, at the first image");
    }
  };

  if (!BannerData || BannerData.length === 0 || !imageUrl) {
    return (
      <p>
        No data or image URL available. BannerData: {JSON.stringify(BannerData)}, Length: {BannerData.length}, ImageURL: {imageUrl}
      </p>
    );
  }

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        <div
          className="flex min-w-full min-h-[450px] lg:min-h-full"
          style={{
            transform: `translateX(-${currentImg * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {BannerData?.length > 0 ? (
            BannerData.map((data, i) => (
              <div
                key={data.id || i} // Use unique id if available
                className="relative min-w-full min-h-[450px] lg:min-h-full overflow-hidden group"
              >
                <div className="w-full h-full">
                  <img
                    src={imageUrl + (data.backdrop_path || "")}
                    alt="movie images"
                    className="h-full w-full object-cover"
                    onError={() => console.log(`Failed to load image for: ${data.title || data.name}`)}
                  />
                </div>

                {/** Button next and prev */}
                <div className="absolute px-4 top-0 w-full h-full items-center justify-between hidden group-hover:lg:flex">
                  <button
                    className="bg-white p-1 rounded-full text-xl text-black"
                    onClick={() => {
                      console.log("Previous button clicked");
                      handlePrevious();
                    }}
                    disabled={currentImg === 0}
                  >
                    <FaAngleLeft />
                  </button>
                  <button
                    className="bg-white p-1 rounded-full text-xl text-black"
                    onClick={() => {
                      console.log("Next button clicked");
                      handleNext();
                    }}
                    disabled={currentImg === BannerData.length - 1}
                  >
                    <FaAngleRight />
                  </button>
                </div>

                <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
                <div className="container mx-auto absolute px-4 bottom-0 max-w-md">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-xl">
                    {data.title || data.name || "No Title"}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">{data.overview || "No description available"}</p>
                  <div className="items-center flex gap-4">
                    <p>Rating: {data.vote_average ? Number(data.vote_average).toFixed(1) : "N/A"}+</p>
                    <span>|</span>
                    <p>View: {data.popularity ? Number(data.popularity).toFixed(0) : "N/A"}</p>
                  </div>
                  <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                    Play Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BannerHome;