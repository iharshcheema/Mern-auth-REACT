import { useState } from 'react'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import UserContext from '@/context/Usercontext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ClipLoader } from 'react-spinners'

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePassChange = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await fetch(
        'https://mern-auth-backend-production-41f9.up.railway.app/change-pass',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, currentPassword, newPassword }),
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
        toast.success(data.message)
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
    <>
      <h1 className=" mx-auto max-w-fit p-5 text-xl mb-1">
        Welcome to the Dashboard! You can now change your password if you want
        to{' '}
        <span role="img" >
          🥳
        </span>
      </h1>
      <div className="mx-auto max-w-fit p-5 ">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              You can change your current password{' '}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePassChange}>
              <Label htmlFor="current-password" className="text-center">
                Current password
              </Label>
              <Input
                id="current-password"
                className="my-4"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.currentTarget.value)}
                required
              />
              <Label htmlFor="new-password" className="text-center">
                New password
              </Label>
              <Input
                id="new-password"
                className="my-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
                required
              />
              <Button type="submit">Save changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
export default Dashboard
