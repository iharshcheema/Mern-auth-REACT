import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { ChevronRight } from 'lucide-react'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false)
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { username, email, password } = location.state || {}

  useEffect(() => {
    if (!email) {
      navigate('/register')
    }
  }, [])

  const handleVerifyOtp = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await fetch(
        'https://mern-auth-backend-production-41f9.up.railway.app/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ otp, username, email, password }),
        }
      )

      const data = await response.json()
      // otp middleware
      if (response.status === 401) {
        toast.error(data.message)
      }
      // registration
      else if (response.status === 400) {
        toast.error(data.message)
      } else if (response.status === 201) {
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

  return (
    <>
      {loading ? (
        <>
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <ClipLoader />
          </div>
        </>
      ) : (
        <div className="mx-auto max-w-fit">
          <form onSubmit={handleVerifyOtp} className="mx-auto w-1/2 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Enter OTP</CardTitle>
                <CardDescription>
                  Enter OTP sent to your email address to continue registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
    </>
  )
}

export default VerifyOtp
