import BannerHome from "../Components/BannerHome"
import { useSelector } from "react-redux"
import HorizontalScrollCard from "../Components/HorizontalScrollCard"
import useFetch from "../hooks/UseFetch"
const Homepage = () => {
   const trendingData = useSelector((state) => state.movieData.bannerData)
  const {data : nowPlayingData} = useFetch('/movie/now_playing')
  const {data: topRatedMovie}= useFetch('/movie/top_rated')
  const {data: popularmovies}= useFetch('/movie/popular')
  const {data: onAirMovies} = useFetch('tv/on_the_air')
  return (
    <section>
      <BannerHome/>
      <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true}/>
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"}/>
      <HorizontalScrollCard data={topRatedMovie} heading={'Top Rated Movies'}/>
      <HorizontalScrollCard  data={popularmovies} heading={"Popular Movies"}/>
      <HorizontalScrollCard data={onAirMovies} heading={"On The Air"}/>
    </section>
  )
}

export default Homepage