import { IoMdHome } from "react-icons/io";
import { PiTelevisionDuotone } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
export const navigation = [
  {
    id: "1",
    title: "TV Shows",
    url: "/tv",
    icon: PiTelevisionDuotone,
  },
  {
    id: "2",
    title: "Movies",
    url: "/movie",
    icon: BiSolidMoviePlay,
  },
];

export const mobileNavigation = [
  {
    id: "1",
    title: "Home",
    url: "/",
    icon: IoMdHome,
  },
  {
    id: "2",
    title: "TV Shows",
    url: "/tv",
    icon: PiTelevisionDuotone,
  },
  {
    id: "3",
    title: "Movies",
    url: "/movie",
    icon: BiSolidMoviePlay,
  },
  {
    id: "4",
    title: "Search",
    url: "/search",
    icon: IoSearchOutline,
  },
];
