import { useContext } from 'react'
import { UserAuthContext } from 'src/context/UserAuthContext'

export const useUserAuth = () => useContext(UserAuthContext)
