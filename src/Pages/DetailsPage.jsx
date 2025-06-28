import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from 'moment';
import Divider from "../Components/Divider";
import UseFetch from '../hooks/UseFetch'
import HorizontalScrollCard from "../Components/HorizontalScrollCard";
import useFetch from "../hooks/UseFetch";
import { useState } from "react";
import VideoPlay from "../Components/VideoPlay";



const DetailsPage = () => {
  const [playVideo, setplayVideo] = useState(false)
  const [playVideoId, setplayVideoId] = useState(" ")
  const params = useParams();
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const { data: detailsData } = useFetchDetails(
    `/${params?.mediaType}/${params?.id}`
  );
  const { data: castData } = useFetchDetails(
    `${params?.mediaType}/${params?.id}/credits`
  );

  const { data: similarData } = UseFetch(`/${params?.mediaType}/${params?.id}/similar`)
  const { data: recommendedData} = useFetch(`/${params?.mediaType}/${params?.id}/recommendations`)

  // Ensure `backdrop_path` exists before rendering the image
  if (!detailsData || !detailsData.backdrop_path) {
    return <div>No image available.</div>;
  }

const hours = Math.floor(detailsData.runtime / 60);
const minutes = detailsData.runtime % 60;
const director = castData?.crew?.filter((person)=> ["Director"].includes(person.job))?.map((person)=>person.name)?.join(" , ") || "Unknown"
const writers = castData?.crew?.filter((person) =>["Writer", "Screenplay", "Story"].includes(person.job))?.map((person) => person.name)?.join(", ") || "Unknown";
const handlePlayVideo = (detailsData)=>{
  setplayVideoId(detailsData.id)
  setplayVideo(true)
}
return (
  <div className="w-full h-full mb-3">
    {/* Backdrop Section */}
    <div className="relative w-full h-[280px] lg:mt-[3rem]">
      <div className="w-full h-full">
        <img
          src={imageUrl + detailsData.backdrop_path}
          alt="Movie Backdrop"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full absolute bg-gradient-to-t top-0 from-neutral-900/90 to-transparent"></div>
    </div>

    <div className="container mx-auto px-3 py-16 flex flex-col lg:flex-row lg:py-0 gap-10">
      {/* Poster Section */}
      <div className="lg:-mt-28 -mt-[14rem] relative mx-auto lg:ml-0 w-fit">
        <img
          src={imageUrl + detailsData.poster_path}
          alt="Movie Poster"
          className="w-[20rem] h-[25rem] object-cover rounded-xl"
        />
        <button
        onClick={()=>handlePlayVideo(detailsData)}
        className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all">
          Play Now
        </button>
      </div>

      {/* Details Section */}
      <div className="relative items-center justify-start w-full">
        <h2 className="text-3xl text-white font-bold">{detailsData.title || detailsData.name}</h2>
        <p className="text-neutral-400">{detailsData.tagline || "No tagline available."}</p>
        <Divider />

        {/* Stats */}
        <div className="flex items-center gap-3">
          <p>Rating: {Number(detailsData.vote_average || 0).toFixed(1)}</p>
          <span>|</span>
          <p>View: {detailsData.vote_count || 0}</p>
          <span>|</span>
          <p>Duration: {hours}h {minutes}m</p>
        </div>
        <Divider />

        {/* Overview */}
        <h3 className="text-white text-xl font-bold py-2">Overview</h3>
        <p className="text-lg">{detailsData.overview || "No overview available."}</p>
        <Divider />

        {/* Additional Info */}
        <div className="flex items-center gap-3 my-3 w-full">
          <p>Status: {detailsData.status || "Unknown"}</p>
          <span>|</span>
          <p>Release Date: {moment(detailsData.release_date || detailsData.first_air_date).format('MMM Do YYYY')}</p>
          <span>|</span>
          <p>
            Revenue: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(detailsData.revenue || 0)}
          </p>
        </div>
        <Divider />
        <div>
           <p><span className="text-white">Directors</span> : {director}</p>
           <Divider/>
            <p><span className="text-white">Writers</span> : {writers}</p>
        </div>
        <Divider/>
       <div>
  <h2 className="relative text-2xl font-bold my-3">Star Casts :</h2>
  <div className="grid grid-cols-[repeat(auto-fit,_minmax(96px,_1fr))] gap-6 pt-3">
    {castData?.cast?.length > 0 ? (
      castData?.cast?.filter(el =>el.profile_path).map((cast, index) => (
        <div key={cast.id || index}>
          <div>
            <img
              src={imageUrl + cast?.profile_path}
              className="w-24 h-24 rounded-full object-cover"
              alt={cast?.name || "Cast Member"}
            />
          </div>
          <p className="font-bold text-center text-sm text-neutral-400">{cast.name}</p>
        </div>
      ))
    ) : (
      <p className="text-neutral-400">No cast information available.</p>
    )}
  </div>
</div>

      </div>
    </div>

    <div>
      <HorizontalScrollCard data={similarData} heading={"Similar "+params?.mediaType}/>
      <HorizontalScrollCard data={recommendedData} heading={"Recommended " +params?.mediaType }/>
    </div>
    {
      playVideo && (
        <VideoPlay videoId={playVideoId} close={()=>setplayVideo(false)}/>
      )
    }

  </div>
);

};

export default DetailsPage;
