import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/bragosiLogo.png";
import { navigation } from "../Contants/index";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import MenuSvg from "../assets/MenuSvg";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Button from "../assets/Button";


const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  const toggleNavigation = () => {
    setOpenNavigation((prev) => {
      if (prev) {
        enablePageScroll();
        return false;
      } else {
        disablePageScroll();
        return true;
      }
    });
  };

  const handleNavLinkClick = () => {
    setOpenNavigation(false);
    enablePageScroll();
  };

  return (
    <header
     className="fixed bg-opacity-75 top-0 w-full h-16 z-40 border-b border-n-6 backdrop-blur-sm  bg-n-8">
      <div className="w-full mx-auto h-full justify-between flex items-center px-3 gap-10">
        {/* Logo Section */}
        <Link to="/" className="relative flex gap-2 flex-row">
          <img src={logo} alt="logo" width={70} height={50} />
          <h1 className="hidden md:block text-2xl font-sans text-white items-center justify-center mt-10">
            Movie App
          </h1>
        </Link>

        {/* Navigation Menu for Larger Screens */}
        <div className="relative hidden lg:flex flex-row items-center justify-center gap-10">
          {navigation.map((item) => {
            const Icon =item.icon
            return(
            <NavLink
              key={item.id}
              to={item.url}
              className={({ isActive }) =>
                isActive
                  ? "text-n-14 font-bold"
                  : "text-white hover:text-gray-400"
              }
            >
              <div className="flex items-center gap-1 justify-center">
                  {item.title}
                <Icon className="w-4 h-4" />
              </div>
            </NavLink>
          )})}
        </div>

        {/* Search and User Section */}
        <div className="relative md:mr-[4rem] flex gap-6 mr-6 items-center">
          <form
            className="flex border-n-14 border rounded-xl h-10 w-[17rem] p-1"
            onSubmit={handleSearchSubmit}
          >
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
              className="w-full ml-4 border-n-4 cursor-pointer justify-center border-l items-center flex rounded-none"
            >
              <IoSearchOutline
                aria-label="Search"
                className="text-lg w-full text-white active:scale-50"
              />
            </button>
          </form>
         <Button
  className="lg:hidden ml-auto min-w-[3rem]" // Ensure enough width for ButtonSvg
  px="px-3"
  onClick={toggleNavigation}
  
>
  <MenuSvg openNavigation={openNavigation} />
</Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {openNavigation && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-n-8 border-b border-n-6 z-40 flex flex-col items-center gap-4 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.id}
              to={item.url}
              onClick={handleNavLinkClick}
              className={({ isActive }) =>
                isActive
                  ? "text-n-14 font-bold text-lg"
                  : "text-white hover:text-gray-400 text-lg"
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;