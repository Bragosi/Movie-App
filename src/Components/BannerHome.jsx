import { useSelector } from "react-redux";
const BannerHome = () => {
  const BannerData = useSelector((state) => state.movieData.bannerData);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  console.log("banner Home", BannerData);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh]">
        {BannerData?.length > 0 ? (
          BannerData.map((data, i) => (
            <div
              key={i}
              className="relative min-w-full min-h-[450px] lg:min-h-full overflow-hidden"
            >
              <img
                src={imageUrl + data.backdrop_path}
                alt="movie images"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto absolute px-4 bottom-0 max-w-md">
                <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-xl">
                  {data.title}
                </h2>
                <p className="text-ellipsis line-clamp-3 my-2">{data.overview}</p>
                <div className="items-center flex gap-4 ">
                  <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                  <p>View : {Number(data.popularity).toFixed(0)} </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </section>
  );
};

export default BannerHome;
