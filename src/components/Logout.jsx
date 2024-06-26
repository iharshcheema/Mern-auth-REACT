import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserContext from '../context/Usercontext'
import ClipLoader from 'react-spinners/ClipLoader'

const Logout = () => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const logout = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://mern-auth-backend-production-41f9.up.railway.app/logout',
          {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        if (response.status === 401) {
          toast.error(data.message)
        } else if (response.status === 403) {
          toast.error(data.message)
        } else if (response.ok) {
          setUser(null)
          toast.success(data.message)
          navigate('/')
        } else toast.error(data.message)
      } catch (error) {
        console.error('Error logging out:', error)
      } finally {
        setLoading(false)
      }
    }

    logout()
  }, [])

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <ClipLoader />
        </div>
      ) : null}
    </>
  )
}
export default Logout
