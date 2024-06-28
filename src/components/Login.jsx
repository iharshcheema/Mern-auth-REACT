import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import UserContext from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'

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
      console.log(user)
    }
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await fetch(
        'https://mern-auth-backend-production-41f9.up.railway.app/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identifier, password }),
          credentials: 'include',
        }
      )

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
        return navigate('/dashboard')
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
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <ClipLoader />
          </div>
        </>
      ) : (
        <>
          <h1 className=" mx-auto max-w-fit p-5 text-xl mb-1">
            Welcome to the Sign in page! You can now put your credentials to
            login into the application<span role="img">🥳</span>
          </h1>
          <div className="mx-auto max-w-fit">
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
                        onChange={(e) => {
                          setIdentifier(e.currentTarget.value)
                        }}
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
                        onChange={(e) => {
                          setPassword(e.currentTarget.value)
                        }}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="submit">Login</Button>
                  <a href="/forgot-password">
                    <Button variant="link" type="button">
                      Forgot Password?
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default Login
