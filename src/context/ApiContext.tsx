// ** React Imports
import { createContext, useState, ReactNode } from 'react'

// ** Types
import { ApiValuesType } from './types'
import { Api } from 'src/__generated__/AccountifyAPI'

// ** Defaults
const defaultProvider: ApiValuesType = {
  $api: new Api({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 30 * 1000 // 30 seconds
  }),
  set$Api: () => null
}

const ApiContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const ApiProvider = ({ children }: Props) => {
  // ** States
  const [$api, set$Api] = useState<Api<unknown>>(defaultProvider.$api)

  const values = {
    $api,
    set$Api
  }

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>
}

export { ApiContext, ApiProvider }
