import { Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Layout from './layout/Layout'
import Logout from './components/Logout'
import UserContextProvider from './context/UserContextProvider'
import Dashboard from './components/Dashboard'
import VerifyOtp from './components/VerifyOtp'
import Page404 from './components/Page404'
import Authrequired from './utils/Authrequired'
import ForgotPass from './components/ForgotPass'
import ResetPassword from './components/ResetPassword'
import Register from './components/Register'

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <Homepage />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            <Route path="/logout" element={<Logout />} />
            <Route element={<Authrequired />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}
export default App
