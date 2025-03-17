import { useNavigate, useParams } from "react-router-dom"

function PersonDashboard() {
  const personId = useParams()

  return (
    <div>PersonDashboard</div>
  )
}

export default PersonDashboard