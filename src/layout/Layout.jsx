import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <>
      <div className="text-xl ">
        <Header />
      </div>
      <div className="p-10 max-w-screen-lg mx-auto my-0  ">
        <Outlet />
      </div>
    </>
  )
}
export default Layout
