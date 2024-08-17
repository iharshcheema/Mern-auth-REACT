import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

import { EditIcon, InfoOutlineIcon, HamburgerIcon } from '@chakra-ui/icons'
import { CiLogin } from 'react-icons/ci'

const Sidebar = () => {
  const location = useLocation()

  return (
    <div>
      {/* Hamburger Button for Small Screens */}
      <Sheet>
        <SheetTrigger>
          <button
            className="block md:hidden p-2 border rounded-lg text-teal-900"
            aria-label="Open Sidebar"
          >
            <HamburgerIcon />
          </button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>MERN Auth</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center gap-6 pt-8">
            <SheetClose asChild>
              <Link
                to="/"
                className={`flex items-center ${
                  location.pathname === '/' ? 'text-teal-600' : 'text-gray-500'
                }`}
                onClick={() => {}}
              >
                <CiLogin className="mr-2" />
                Login
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to="/register"
                className={`flex items-center ${
                  location.pathname === '/register'
                    ? 'text-teal-600'
                    : 'text-gray-500'
                }`}
                onClick={() => {}}
              >
                <EditIcon className="mr-2" />
                Register
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link
                to="/about"
                className={`flex items-center ${
                  location.pathname === '/about'
                    ? 'text-teal-600'
                    : 'text-gray-500'
                }`}
                onClick={() => {}}
              >
                <InfoOutlineIcon className="mr-2" />
                About
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar for Larger Screens */}
      <div className="fixed top-0 h-full w-40 flex-col items-center shadow-2xl gap-6 pt-8 hidden md:flex">
        <Link
          to="/"
          className={`flex items-center ${
            location.pathname === '/' ? 'text-teal-600' : 'text-gray-500'
          }`}
        >
          <CiLogin className="mr-2" />
          Log-in
        </Link>
        <Link
          to="/register"
          className={`flex items-center ${
            location.pathname === '/register'
              ? 'text-teal-600'
              : 'text-gray-500'
          }`}
        >
          <EditIcon className="mr-2" />
          Register
        </Link>
        <Link
          to="/about"
          className={`flex items-center ${
            location.pathname === '/about' ? 'text-teal-600' : 'text-gray-500'
          }`}
        >
          <InfoOutlineIcon className="mr-2" />
          About
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
