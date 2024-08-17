import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
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

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const Register = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await fetch(
        'https://mern-auth-backend-production-41f9.up.railway.app/generate-otp',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email }),
        }
      )
      const data = await response.json()
      if (response.status === 400) {
        toast.error(data.message)
      } else if (response.status === 409) {
        toast.error(data.message)
      } else if (response.status === 200) {
        toast.success(data.message)
        navigate('/verify-otp', { state: { email, password, username } })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.')
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
          <div
            className="mx-auto max-w-4xl flex items-center justify-center lg:flex-row flex-col
          md:max-w-min
          lg:max-w-3xl
          xl:max-w-4xl
          "
          >
            {/* GIF Section - Hidden on small screens */}
            <div className="hidden xl:block mr-20">
              <iframe
                src="https://giphy.com/embed/9JrkkDoJuU0FbdbUZU"
                width="480"
                height="455"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>

            {/* Registration Form Section */}
            <div className="max-w-xl lg:w-1/2">
              <form onSubmit={Register}>
                <Card>
                  <CardHeader>
                    <CardTitle>Registration</CardTitle>
                    <CardDescription>
                      Enter your Username and password which you will use to
                      sign in to our application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Your email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="username">Enter username</Label>
                        <Input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your username"
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Enter password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between flex-wrap">
                    <Button type="submit">Complete Registration</Button>
                    <a href="/">
                      <Button variant="link" type="button">
                        Existing user? Sign-in
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Register
