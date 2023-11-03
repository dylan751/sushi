'use client'
import { Api } from 'src/__generated__/AccountifyAPI'

export const $api = (token?: string) => {
  return new Api({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 30 * 1000, // 30 seconds
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
