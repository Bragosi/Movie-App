import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Components/Card";

const ExplorePage = ({ mediaType }) => {
  const [data, setData] = useState([]); // Holds the TV or movie data
  const [page, setPage] = useState(1); // Tracks the current page
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/discover/${mediaType}`, {
        params: { page },
      });
      setData((prevData) => [...prevData, ...response.data.results]); // Append new data
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching ${mediaType} data:`, error);
      setIsLoading(false);
    }
  };

  // Fetch initial data and subsequent pages
  useEffect(() => {
    fetchData();
  }, [mediaType, page]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      setPage((prevPage) => prevPage + 1); // Increment the page number
    }
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

 return (
  <section className="py-9">
    <div className="w-full px-3">
      <h3 className="capitalize lg:text-xl text-lg font-semibold">
        {mediaType === "movie" ? "Popular Movies" : "Popular TV Shows"}
      </h3>
      <div className="grid py-4 sm:grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] grid-cols-1 gap-6 w-full justify-items-center">
        {data.map((exploredata) => (
          <Card key={exploredata.id} data={exploredata} media_type={mediaType} />
        ))}
      </div>
      {isLoading && <p>Loading more {mediaType === "movie" ? "movies" : "TV shows"}...</p>}
    </div>
  </section>
);

};

export default ExplorePage;
