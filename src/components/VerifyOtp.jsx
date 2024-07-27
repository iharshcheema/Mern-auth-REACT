import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
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
          <form onSubmit={handleVerifyOtp} className="mx-auto p-4">
            <Card>
              <CardHeader>
                <CardTitle>Enter OTP</CardTitle>
                <CardDescription>
                  Enter OTP sent to your email address to continue registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InputOTP
                  value={otp}
                  onChange={(otp) => setOtp(otp)}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup className="flex flex-wrap ">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />

                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
    </>
  )
}

export default VerifyOtp
