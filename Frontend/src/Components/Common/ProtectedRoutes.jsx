import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({children, role}) => {

  const { user } = useSelector((state) => state.auth)

  if (!user || (user.role !== role)) {
    return <Navigate to="/login"/>
  }
  return  children
}

export default ProtectedRoutes