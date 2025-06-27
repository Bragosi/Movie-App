import { useState, useEffect } from "react"
import axios from "axios"

const useFetchDetails = (endpoint)=>{
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)

    const FetchData = async()=>{
    try {
        setloading(true)
      const response = await axios.get(endpoint)
      setloading(false)
      setData(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }
useEffect(()=>{
    FetchData()
},[endpoint])
    return{data, loading}
}
export default useFetchDetails