import BannerHome from "../Components/BannerHome"
import { useSelector } from "react-redux"
import HorizontalScrollCard from "../Components/HorizontalScrollCard"
import { useEffect, useState } from "react"
import axios from "axios"
import useFetch from "../hooks/UseFetch"
const Homepage = () => {
   const trendingData = useSelector((state) => state.movieData.bannerData)
  const {data : nowPlayingData} = useFetch('/movie/now_playing')
 {/**
   const fetchNowPlayingData= async()=>{
    try {
      const response = await axios.get("/movie/now_playing")
      setNowPlayingData(response.data.results)
    } catch (error) {
      console.log('error', error)
    }
  }
useEffect(()=>{
  fetchNowPlayingData()
},[]) */}
  return (
    <section>
      <BannerHome/>
      <HorizontalScrollCard data={trendingData} heading={"Trending"}/>
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"}/>
    </section>
  )
}

export default Homepage