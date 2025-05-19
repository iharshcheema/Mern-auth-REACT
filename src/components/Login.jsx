import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import UserContext from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '@/apiconfig/apiconfig'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import ClipLoader from 'react-spinners/ClipLoader'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
        credentials: 'include',
      })

      const data = await response.json()
      if (response.status === 400) {
        toast.error(data.message)
      } else if (response.status === 401) {
        toast.error(data.message)
      } else if (response.status === 403) {
        toast.error(data.message)
      } else if (response.status === 200) {
        setUser(data.payload)
        toast.success('Signed in successfully')
        navigate('/dashboard')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <ClipLoader />
        </div>
      ) : (
        <div
          className="mx-auto max-w-4xl flex items-center justify-center lg:flex-row flex-col
          md:max-w-min
          lg:max-w-3xl
          xl:max-w-4xl
          "
        >
          {/* GIF Section - Hidden on small screens */}

          {/* Login Form Section */}
          <div className="max-w-xl lg:w-1/2">
            <form onSubmit={handleLogin}>
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to sign in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="identifier">
                        Enter username or Email
                      </Label>
                      <Input
                        id="identifier"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.currentTarget.value)}
                        placeholder="Enter your username or Email address"
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Enter password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between flex-wrap">
                  <Button type="submit">Login</Button>
                  <a href="/forgot-password">
                    <Button variant="link" type="button">
                      Forgot Pass?
                    </Button>
                  </a>
                  <a href="/register">
                    <Button variant="link" type="button">
                      New User? Register
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
