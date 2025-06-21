import BannerHome from "../Components/BannerHome"
import Card from "../Components/Card"
import { useSelector } from "react-redux"

const Homepage = () => {
   const trendingData = useSelector((state) => state.movieData.bannerData)
   console.log('trending', trendingData)
  return (
    <section>
      <BannerHome/>
      
      <div className="container mx-auto px-3 my-10">
        <h2 className="text-xl font-bold mb-2 lg:text-2xl text-white">Trending Shows</h2>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))] gap-6 grid-flow-col overflow-hidden">   
          {trendingData.map((data, index)=>{
          return(
            <Card key={data.id} data={data} index={index+1} trending={true}/>
          )
        })}
        </div>
      </div>
    </section>
  )
}

export default Homepage