import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BASE_URL } from '@/apiconfig/apiconfig'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ClipLoader } from 'react-spinners'

const ForgotPass = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await fetch(`${BASE_URL}/forgot-pass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      })

      const data = await response.json()
      if (response.status === 400) {
        toast.error(data.message)
      } else if (response.status === 401) {
        toast.error(data.message)
      } else if (response.status === 200) {
        toast.success(data.message)
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }
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
    <div className="mx-auto max-w-fit">
      <Card>
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
          <CardDescription>
            Enter the Email address connected to your Email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">Enter Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="my-5"
              required
            />
            <Button>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
export default ForgotPass
