// ** Third Party Imports
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { Api } from 'src/__generated__/AccountifyAPI'

/*
 * As we do not have backend server, the refresh token feature has not been incorporated into the template.
 * Please refer https://next-auth.js.org/tutorials/refresh-token-rotation link for a reference.
 */

export const authOptions: NextAuthOptions = {
  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialsProvider({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {},
      async authorize(credentials): Promise<any> {
        /*
         * You need to provide your own logic here that takes the credentials submitted and returns either
         * an object representing a user or value that is false/null if the credentials are invalid.
         * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
         * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
         */
        const { email, password } = credentials as { email: string; password: string }

        try {
          // ** Login API Call to match the user credentials and receive user data in response along with his role
          const response = await new Api({
            baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
            timeout: 30 * 1000 // 30 seconds
          }).internal.login({ email, password })

          const user = {
            userData: response.data.userData,
            accessToken: response.data.accessToken
          }

          if (user) {
            /*
             * Please unset all the sensitive information of the user either from API response or before returning
             * user data below. Below return statement will set the user object in the token and the same is set in
             * the session which will be accessible all over the app.
             */

            return user
          }

          return null
        } catch {
          throw new Error('Email or Password is invalid')
        }
      }
    }),

    // ** ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/404'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ user, account, token, session, trigger }: any) {
      /*
       * For adding custom parameters to user in session, we first need to add those parameters
       * in token which then will be available in the `session()` callback
       */
      if (user) {
        /**
         * Logic for Credentials login
         */
        if (account.provider === 'credentials') {
          token.name = user.userData.name
          token.email = user.userData.email
          token.phone = user.userData.phone
          token.address = user.userData.address
          token.avatar = user.userData.avatar
          token.organizations = user.userData.organizations
          token.accessToken = user.accessToken
        }

        /**
         * Logic for Google login
         */
        if (account.provider === 'google') {
          try {
            // Get user profile from database based on token.email
            const response = await new Api({
              baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
              timeout: 30 * 1000 // 30 seconds
            }).internal.loginWithGoogle({ email: user.email, name: user.name, avatar: user.image })

            token.name = response.data.userData.name
            token.email = response.data.userData.email
            token.phone = response.data.userData.phone
            token.address = response.data.userData.address
            token.avatar = response.data.userData.avatar
            token.organizations = response.data.userData.organizations
            token.accessToken = response.data.accessToken
          } catch {
            throw new Error('There is something wrong with Google login')
          }
        }
      }

      if (trigger === 'update' && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        if (session.organizations) {
          token.organizations = session.organizations
        }
      }

      return token
    },

    async session({ session, token, trigger, newSession }: any) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user.name = token.name
        session.user.email = token.email
        session.user.phone = token.phone
        session.user.address = token.address
        session.user.avatar = token.avatar
        session.user.organizations = token.organizations
        session.accessToken = token.accessToken
      }

      if (trigger === 'update' && newSession) {
        // newSession is reflected from the above `jwt()` function

        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // Make sure the updated value is reflected on the client (Front-end)
        if (newSession.organizations) {
          session.user.organizations = newSession.organizations
        }
      }

      return session
    }
  }
}

export default NextAuth(authOptions)
