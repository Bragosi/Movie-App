import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (endpoint)=>{
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)

    const FetchData = async()=>{
    try {
        setloading(true)
      const response = await axios.get(endpoint)
      setData(response.data.results)
    } catch (error) {
      console.log('error', error)
    }
  }
useEffect(()=>{
    FetchData()
},[])
    return{data, loading}
}
export default useFetch