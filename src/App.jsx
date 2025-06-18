import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SearchPage from "./Pages/SearchPage";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ExplorePage from "./Pages/ExplorePage";
import DetailsPage from "./Pages/DetailsPage";
import ButtonGradient from './assets/ButtonGradient'
import MobileNavigation from "./Components/MobileNavigation";
export default function App() {
  return (
    <Router>
      <div className="pb-14 lg:pb-0">
        <Header />
        {/* Routes */}
        <div className="mt-16">
          <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchPage />}/>
          <Route path="/Explore" element={<ExplorePage/>}/>
          <Route path="/details" element={<DetailsPage/>} />
        </Routes>
        </div>
          <Footer />
      </div>
      <MobileNavigation/>
      <ButtonGradient/>
    </Router>
    
  );
}
