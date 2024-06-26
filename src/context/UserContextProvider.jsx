import { useState, useEffect } from 'react'
import UserContext from './Usercontext'

const UserContextProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || null
  const [user, setUser] = useState(storedUser)

  // Effect to initialize user state from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Effect to update local storage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
