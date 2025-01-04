import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
//The most simple usage is when you want to require authentication for your entire site. You can add a middleware.js
import {getToken} from "next-auth/jwt"
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({req:request})
    const url = request.nextUrl
    if(token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify') ||
        url.pathname.startsWith('/')
    )){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    //token h matlab verifed ho toh unko dashboard pe redirect krdo
    return NextResponse.redirect(new URL('/home', request.url))
  
}
//paranthesis jab bhi bnate h grouping krte h (auth)
 
// See "Matching Paths" below to learn more
//config kaha kaha apn chahte h middleware run kre
// /dashboard/:path* matlab /dashboard me jitne bhi path honge sabme chlenge
export const config = {
  matcher: ['/sign-in','/sign-up','/','/dashboard/:path*','/verify/:path*'
  ]
  
}
//ab ye sab hone ke baad we will do the frontend part  make new folder make [auth] in app then sign-in folder
//ab apn frontend par kaam krenge so pehle sign in go to next auth js copy code from getting started -> login