import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/Usercontext'
import { useContext } from 'react'
import { ClipLoader } from 'react-spinners'

const Header = () => {
  const [loading, setLoading] = useState(true)
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const checkLoginOnStart = async () => {
      try {
        const response = await fetch(
          'https://mern-auth-backend-production-41f9.up.railway.app/check-login-on-start',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        )
        const data = await response.json()
        setUser(data.username)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    checkLoginOnStart()
  }, [setUser])
  if (loading) {
    return (
      <>
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <ClipLoader />
        </div>
      </>
    )
  }

  return (
    <>
      <div className=" text-center font-bold ">
        <header className=" flex justify-evenly py-10">
          <div>
            <Link to="/">MERN Auth</Link>
          </div>
          <div>
            {user ? (
              <>
                <Link to="/logout" className="pr-5">
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="pr-10">
                  Log in
                </Link>
                <Link to="/register">Sign up</Link>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  )
}
export default Header
