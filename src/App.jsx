import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SearchPage from "./Pages/SearchPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ExplorePage from "./Pages/ExplorePage";
import DetailsPage from "./Pages/DetailsPage";
import ButtonGradient from "./assets/ButtonGradient";
import MobileNavigation from "./Components/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageUrl } from "./store/MovieSlice";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import ScrollToTop from "./hooks/ScrollToTop";

export default function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");

      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="pb-14 lg:pb-0">
          <Header />
          <div className="xl:mt-13 mt-11">
            <ScrollToTop/>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route
                path="/tv"
                element={<ExplorePage key="tv" mediaType="tv" />}
              />
              <Route
                path="/movie"
                element={<ExplorePage key="movie" mediaType="movie" />}
              />
              <Route path="/details/:mediaType/:id" element={<DetailsPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <MobileNavigation />
        <ButtonGradient />
      </Router>
    </Provider>
  );
}
