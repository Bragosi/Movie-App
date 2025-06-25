import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../Components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(location.search).get("q") || "";
      console.log("Query parameter:", query);

      if (!query) {
        setData([]); // Clear data if no query provided
        setIsLoading(false);
        return;
      }

      const response = await axios.get("/search/collection", {
        params: {
          query,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      });

      console.log("API Response:", response.data);
      setData(response.data.results || []); // Update results
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-semibold">Search Results</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data.length === 0 && <p>No results found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
