"use client"
import './page.css';
import { useSession } from "next-auth/react"

export default function Home() {

  const { data: session, status } = useSession()

  return (
    <div className="app-wrapper">
      {status === "authenticated" && session.user ? (
        <p>Signed in as {session.user.email}</p>
      ) : (
        <a href="/api/auth/signin">Sign in</a>
      )}
    </div>
  )
}