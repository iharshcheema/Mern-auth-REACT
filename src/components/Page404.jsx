import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'


const Page404 = () => {
  return (
    <Card className="mx-auto max-w-fit text-center ">
      <CardHeader>
        <CardTitle className="mb-1">Error 404!</CardTitle>
        <CardDescription>Page Not Found</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost">
          {' '}
          <a href="/">Go back to Homepage</a>
        </Button>
      </CardContent>
    </Card>
  )
}
export default Page404
