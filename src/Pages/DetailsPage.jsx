import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";

const DetailsPage = () => {
  const params = useParams();
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const { data: detailsData } = useFetchDetails(
    `/${params?.mediaType}/${params?.id}`
  );
  const { data: castData } = useFetchDetails(
    `${params?.mediaType}/${params?.id}/credits`
  );

  console.log("Details Data:", detailsData);
  console.log("Cast Data:", castData);

  // Ensure `backdrop_path` exists before rendering the image
  if (!detailsData || !detailsData.backdrop_path) {
    return <div>No image available.</div>;
  }

  const hours = Math.floor(detailsData.runtime / 60);
  const minutes = detailsData.runtime % 60;

  return (
    <div className="w-full h-full mb-3">
      <div className="relative w-full h-[280px] lg:mt-[4rem]">
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
        <div className="lg:-mt-28 -mt-[14rem] relative mx-auto lg:ml-0 w-fit">
          <img
            src={imageUrl + detailsData.poster_path}
            alt="Movie Backdrop"
            className="w-[20rem] h-[25rem] object-cover rounded-xl"
          />
        </div>

        <div className="relative items-center justify-start w-full">
          <h2 className="text-2xl text-white font-bold ">
            {detailsData.title || detailsData.name}
          </h2>
          <p className="text-neutral-400 my-3">{detailsData.tagline}</p>

          <div className="flex items-center my-1 gap-3 ">
            <p>Rating: {Number(detailsData.vote_average).toFixed(1)} +</p>
            <span>|</span>
            <p>View: {Number(detailsData.vote_count)}</p>
            <span>|</span>
            <p>
              Duration: {hours}h {minutes}m
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
