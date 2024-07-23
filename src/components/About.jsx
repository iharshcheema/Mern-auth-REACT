import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const About = () => {
  return (
    <div className="mx-auto max-w-fit text-center">
      <Card>
        <CardHeader>
          <CardTitle className="mb-7">
            Welcome to MERN AUTHENTICATION!
          </CardTitle>
          <CardDescription className="mb-7">
            Welcome to our authentication system, which utilizes JSON Web Tokens
            (JWT) for authentication. Access to protected content is restricted
            to authenticated users only. The system employs React Context to
            manage state, Shadcn components for the user interface, and React
            Router v6 to handle front-end routing. When users register for the
            first time, a two-step verification process involving OTP
            verification is conducted. Users can log in using either their
            username or email.Additionally, it allows users to reset their
            password via an email link if forgotten, and enables signed-in users
            to change their password.
          </CardDescription>
        </CardHeader>
        <CardContent className="mb-2">
          Click on <span className="font-semibold">Register</span> if you are a new
          user to register or Click on{' '}
          <span className="font-semibold">Login</span> to sign in to the
          application.
        </CardContent>
      </Card>
    </div>
  )
}
export default About
