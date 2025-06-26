import { useParams } from "react-router-dom"

const DetailsPage = () => {
  const params = useParams()
  console.log('parameters', params)
  return (
    <div className="w-">
      Details
    </div>
  )
}

export default DetailsPage