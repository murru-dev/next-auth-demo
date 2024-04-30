import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })
        const user = await res.json()
        if (res.ok && user) {
          return { ...user, email: credentials.email }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt: async (token, user, account) => {
      // Add access_token to jwt token
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      // Add access_token to session
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return Promise.resolve(session);
    }
  }
}

export default NextAuth(authOptions);

// eslint-disable-next-line import/no-anonymous-default-export
//export default (req, res) => NextAuth(req, res, authOptions)