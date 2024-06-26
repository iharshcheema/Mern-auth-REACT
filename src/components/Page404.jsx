import { Button } from './ui/button'

const Page404 = () => {
  return (
    <div className="mx-auto max-w-fit text-center">
      <h1 className="text-9xl font-bold mt-10">404</h1>
      <p className="text-xl">Page Not Found</p>
      <Button variant="link">
        <a href="/">Click here to Go Back Home</a>
      </Button>
    </div>
  )
}
export default Page404
