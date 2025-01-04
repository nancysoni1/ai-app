// authprovider ek client componenet hota h (why?)
//sessionprovider? why we are wriuting this code ,,, why use client?
//sessionprovider , authprovider ?
'use client'
import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react"
export default function AuthProvider({
    children,
  }:{children: React.ReactNode}) {
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    )
  }
  //ab hum jayenge layout me or uske rap kr demge poore ko auth provider se 
  
  