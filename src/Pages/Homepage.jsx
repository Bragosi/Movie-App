import BannerHome from "../Components/BannerHome"
import { useSelector } from "react-redux"
import HorizontalScrollCard from "../Components/HorizontalScrollCard"

const Homepage = () => {
   const trendingData = useSelector((state) => state.movieData.bannerData)
  
  return (
    <section>
      <BannerHome/>
      <HorizontalScrollCard data={trendingData} heading="Trending"/>
    </section>
  )
}

export default Homepage