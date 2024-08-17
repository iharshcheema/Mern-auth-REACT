import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { TbMinusVertical } from 'react-icons/tb'

const Header = () => {
  return (
    <div className="text-center font-bold py-10 mb-10 mx-auto max-w-fit flex flex-col gap-5">
      <h1 className="text-gray-600 font-medium mb-5">
        MERN Authentication System
      </h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <TbMinusVertical />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/about">About</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <TbMinusVertical />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/register">Register</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <TbMinusVertical />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Log-in</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
export default Header
