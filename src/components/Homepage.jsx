import { useContext } from 'react'
import UserContext from '@/context/Usercontext'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Homepage = () => {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  if (!user) {
    return navigate('/dashboard')
  }
  return (
    <div className="mx-auto max-w-fit text-center">
      <Card>
        <CardHeader>
          <CardTitle>MERN AUTHENTICATION </CardTitle>
          <CardDescription>
            Welcome to our authentication system, which utilizes JSON Web Tokens
            (JWT) for authentication. Access to protected content is restricted
            to authenticated users only. The system employs React Context to
            manage state, Shadcn components for the user interface, and React
            Router v6 to handle front-end routing. When users register for the
            first time, a two-step verification process involving OTP
            verification is conducted. Users can log in using either their
            username or email.Additionally, it features custom error handling on
            the backend, allows users to reset their password via an email link
            if forgotten, and enables signed-in users to change their password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Click on the SIGN UP button if you are a new user to register or click
          on the LOG IN button to sign in to the application.
        </CardContent>
      </Card>
    </div>
  )
}
export default Homepage
