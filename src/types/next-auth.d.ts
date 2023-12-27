import { ProfileResponseDto } from 'src/__generated__/AccountifyAPI'

declare module 'next-auth' {
  // eslint-disable-next-line lines-around-comment
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ProfileResponseDto
    accessToken: string
  }
}
