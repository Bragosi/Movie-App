import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/bragosiLogo.png";
import { navigation } from "../Contants/index";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  return (
    <header className="fixed top-0 w-full h-16 z-40 bg-n-8 border-b border-n-6 backdrop-blur-sm bg-opacity-75">
      <div className="w-full mx-auto h-full flex items-center justify-between px-4 md:px-6 lg:px-10">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" width={50} height={40} />
          <h1 className="text-xl font-sans text-white">Movieo</h1>
        </Link>

        {/* Navigation Menu for Larger Screens */}
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

        <div className="relative flex justify-end items-center">
           <form
          className="flex items-center bg-n-10 border border-n-6 rounded-full px-3 h-10 w-4/5 sm:w-[17rem] lg:w-[20rem]"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Search here"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
        </div>
      </div>

    </header>
  );
};

export default Header;
