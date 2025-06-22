import { useSelector } from "react-redux";
import moment from 'moment'
import { Link } from "react-router-dom";

const Card = ({ data, trending, index }) => {
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  return (
    <Link to={"/"+data.media_type+"/"+data.id} className="w-full min-w-[230px] max-w-[230px] h-100 relative  rounded overflow-hidden">
      <img src={imageUrl + data?.poster_path} alt="trending-movies" />
    <div className="absolute top-4">
        {trending && 
         <div className="py-1 px-4 bg-black/60  backdrop-blur-3xl overflow-hidden rounded-r-full"> #{index} Trending</div>}
    </div>

    <div className="absolute bottom-0 h-15 backdrop-blur-3xl w-full bg-black/60 p-2 ">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">{data.title || data.name}</h2>
       <div className="flex justify-between text-sm text-neutral-400">
         <p>{moment(data.release_date).format("MMM Do YYYY")}</p>
         <p className="bg-black rounded-full p-1 text-xs">
           Rating: {data.vote_average !== undefined
              ? `${Number(data.vote_average).toFixed(1)}`
              : "No Rating"}
              </p>
       </div>
    </div>f
    </Link>
  );
};

export default Card;
