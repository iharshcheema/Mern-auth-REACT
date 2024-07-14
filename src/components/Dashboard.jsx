import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import UserContext from '@/context/Usercontext'
import { useNavigate } from 'react-router-dom'
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
  const [logoutLoading, setlogoutLoading] = useState(false)
  const navigate = useNavigate()

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

  const handleLogout = async () => {
    try {
      setlogoutLoading(true)
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
      setlogoutLoading(false)
    }
  }

  if (loading || logoutLoading) {
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
      <div className="mx-auto max-w-fit p-5 flex flex-col ">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to the Dashboard !</CardTitle>
            <CardDescription>
              You can change your current password or you can logout{' '}
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

        <Button variant="destructive" onClick={handleLogout} className="mt-5 ">
          Logout
        </Button>
      </div>
    </>
  )
}
export default Dashboard
