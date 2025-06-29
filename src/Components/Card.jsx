import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const mediaType = media_type || data.media_type || "movie";

  // Handle release date for both movies and TV shows
  const releaseDate = data.release_date || data.first_air_date;

  return (
    <Link
      to={`/details/${mediaType}/${data.id}`}
      className="w-full min-w-[230px] max-w-[230px] h-100 relative rounded overflow-hidden block hover:scale-105 transition-all"
    >
      <img src={imageUrl + data?.poster_path} alt="movies" />
      <div className="absolute top-4">
        {trending && (
          <div className="py-1 px-4 bg-black/60 backdrop-blur-3xl overflow-hidden rounded-r-full">
            #{index} Trending
          </div>
        )}
      </div>

      <div className="absolute bottom-0 h-15 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data.title || data.name}
        </h2>
        <div className="flex justify-between text-sm text-neutral-400">
          {/* Format release date or display "Unknown" if unavailable */}
          <p>
            {releaseDate
              ? moment(releaseDate).format("MMM Do YYYY")
              : "Unknown Release Date"}
          </p>
          <p className="bg-black rounded-full p-1 text-xs">
            Rating:{" "}
            {data.vote_average !== undefined
              ? `${Number(data.vote_average).toFixed(1)}`
              : "No Rating"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
