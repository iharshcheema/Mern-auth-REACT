import UserContext from '@/context/Usercontext'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Authrequired = () => {
  const { user, setUser } = useContext(UserContext)

  if (!user) {
    return <Navigate to="/" />
  }
  return <Outlet />
}
export default Authrequired
