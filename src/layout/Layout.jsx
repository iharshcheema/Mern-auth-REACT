import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <>
      <div class="bg-gradient-to-r from-white to-gray-400 min-h-screen">
        <div className="flex h-full ">
          <Sidebar />
          <div className="flex-1 h-full pt-6 max-w-min text-center mx-auto my-0 md:max-w-min lg:max-w-4xl ">
            <h1 className="text-gray-600 font-bold pb-20 ">
              MERN Authentication System
            </h1>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
