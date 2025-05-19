import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { BASE_URL } from '@/apiconfig/apiconfig'


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ClipLoader } from 'react-spinners'

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetPass = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (password !== confirmPassword) {
        return toast.error('Password did not match')
      }
      const response = await fetch(`${BASE_URL}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      })
      const data = await response.json()
      if (response.status === 400) {
        toast.error(data.message)
      } else if (response.status === 401) {
        toast.error(data.message)
        navigate('/')
      }
      if (response.status === 200) {
        toast.success(data.message)
        navigate('/')
      } else {
        toast.error(data.message)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <>
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <ClipLoader />
          </div>
        </>
      </>
    )
  }

  return (
    <>
      <div className="mx-auto max-w-fit">
        <Card>
          <CardHeader>
            <CardTitle>Reset your password</CardTitle>
            <CardDescription>
              Enter your new password and Confirm the new password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPass}>
              <Label htmlFor="name">Enter password</Label>
              <Input
                id="name"
                className="mb-5"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <Label htmlFor="name">Confirm password</Label>
              <Input
                id="name"
                className="mb-5"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  )
}
export default ResetPassword
