import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]); // Stores fetched data
  const [isLoading, setIsLoading] = useState(false); // Tracks loading state
  const [page, setPage] = useState(1); // Tracks the current page
  const [hasMore, setHasMore] = useState(true); // Tracks if more data is available

  const fetchData = async (currentPage) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(location.search).get("q") || "";
      console.log("Query parameter:", query);

      let response;
      if (!query) {
        console.log("Fetching default data...");
        response = await axios.get("/discover/movie", {
          params: {
            include_adult: false,
            language: "en-US",
            sort_by: "popularity.desc",
            page: currentPage,
          },
        });
      } else {
        console.log("Fetching search results...");
        response = await axios.get("/search/multi", {
          params: {
            query,
            include_adult: false,
            language: "en-US",
            page: currentPage,
          },
        });
      }

      console.log("API Response:", response.data);

      // Append new results to existing data
      setData((prevData) => [...prevData, ...(response.data?.results || [])]);

      // Check if more pages are available
      if (response.data.results.length === 0 || currentPage >= response.data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch and reset when query changes
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchData(1);
  }, [location.search]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      hasMore &&
      !isLoading &&
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, [hasMore, isLoading]);

  // Fetch data when page changes
  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  return (
    <div className="pt-5 mb-4 ml-3">
      <h1 className="text-2xl mb-2 font-semibold">Search Results</h1>
      {isLoading && page === 1 && <p>Loading...</p>}
      {!isLoading && data.length === 0 && <p>No results found.</p>}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-6">
        {data.map((item, index) => (
          <Card key={item.id + "heading" + index} data={item} index={index + 1} />
        ))}
      </div>
      {isLoading && page > 1 && <p>Loading more...</p>}
      {!hasMore && <p>No more results available.</p>}
    </div>
  );
};

export default SearchPage;
