import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";

const VideoPlay = ({ videoId, close, media_type }) => {
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${videoId}/videos`
  );
  console.log("video", videoData);
  return (
    <section className="fixed mt-5 bg-black/50 top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <div className="relative bg-black w-full lg:h-[80vh] max-w-screen-lg aspect-video rounded">
        <button
          className="absolute top-2 right-2 text-3xl text-white hover:text-red-500"
          onClick={close}
        >
          <IoClose />
        </button>
        {videoData?.results?.length > 0 ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoData.results[0].key}`}
            className="w-full h-full"
            title="Video Player"
            allowFullScreen
          />
        ) : (
          <p className="text-white text-center">No video available.</p>
        )}
      </div>
    </section>
  );
};

export default VideoPlay;
