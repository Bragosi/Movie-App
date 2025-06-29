import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/bragosiLogo.png";
import { navigation } from "../Contants/index";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get("/search/multi", {
        params: {
          query,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      });
      setSuggestions(response.data.results || []);
      setSuggestionsVisible(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion.name || suggestion.title);
    navigate(`/search?q=${suggestion.name || suggestion.title}`);
    setSuggestionsVisible(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput.trim()}`);
      setSuggestionsVisible(false);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 z-40 bg-n-8 border-b border-n-6 backdrop-blur-sm bg-opacity-75">
      <div className="w-full mx-auto h-full flex items-center justify-between px-4 md:px-6 lg:px-10">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" width={50} height={40} />
          <h1 className="text-2xl font-mono text-white">MOVOSI</h1>
        </Link>

        {/* Navigation Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "text-n-14 font-bold"
                    : "text-white hover:text-gray-400"
                }
              >
                <div className="flex items-center gap-2">
                  {item.title}
                  <Icon className="w-4 h-4" />
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative items-center pt-1 justify-end flex">
          <form
            className="flex items-center bg-n-10 border border-n-6 rounded-full px-3 h-10 w-4/5 sm:w-[17rem] lg:w-[20rem]"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              placeholder="Search here"
              value={searchInput}
              onChange={handleSearchInputChange}
              className="bg-transparent outline-none px-2 text-white w-full"
            />
            <button
              type="submit"
              disabled={!searchInput.trim()}
              className="ml-2 text-white"
            >
              <IoSearchOutline className="text-lg" />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {isSuggestionsVisible && suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-n-9 text-white rounded-md shadow-lg z-50">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-2 hover:bg-n-5 border-b  cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name || suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
