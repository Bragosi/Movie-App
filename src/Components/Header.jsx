import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/bragosiLogo.png";
import { navigation } from "../Contants/index";
import { FaUser, FaSearch } from "react-icons/fa";
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
    <header className="fixed top-0 w-full h-16 z-50 border-b border-n-6 backdrop-blur-sm bg-n-8">
      <div className="w-full mx-auto h-full justify-between flex items-center px-3 gap-10">
        {/** Logo Section */}
        <div className="relative flex gap-2 flex-row">
          <img src={logo} alt="logo" width={70} height={50} />
          <h1 className="hidden md:block text-2xl font-sans text-white items-center justify-center mt-10">
            Movie App
          </h1>
        </div>

        {/** Navigation Menu */}
        <div className="relative hidden lg:flex flex-row items-center justify-center gap-4">
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              className={({ isActive }) =>
                isActive
                  ? "text-n-14 font-bold"
                  : "text-white hover:text-gray-400"
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>

        {/** Search and User Section */}
        <div className="relative md:mr-[4rem] flex gap-6 mr-6 items-center">
          <form className="flex border-b" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search here"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-transparent outline-none border-none px-2"
            />
            <button
              type="submit"
              disabled={!searchInput.trim()}
              className="border w-8 h-8 justify-center items-center flex rounded-xl mb-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSearch aria-label="Search" className="text-lg hover:text-n-14 active:scale-50" />
            </button>
          </form>
          <FaUser
            className="text-2xl bg-n-14 w-8 h-8 rounded-full p-1 hover:text-n-14 active:scale-50 hover:bg-n-1"
            aria-label="User Profile"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
