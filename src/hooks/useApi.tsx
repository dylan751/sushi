import { useContext } from 'react'
import { ApiContext } from 'src/context/ApiContext'

export const useApi = () => useContext(ApiContext)
