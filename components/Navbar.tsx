"use client"
import React from 'react'
import Link from 'next/link'
import{useSession, signOut} from 'next-auth/react'
import {User} from 'next-auth'
import {Button} from './ui/button'
// difference between next-auth and next-auth react 
// jaha bhi use likjha diikha dikhe waha se direct dat anhi liy aja skta cause vo ek method h hook h 
const Navbar = () => {
    const {data:session} = useSession()
    const user: User = session?.user as User
    //authenticated hoga too  hi session hoga  ... therefor esyntax authenticate h then session ? () : () otherwise
    return (
        <nav className='p-4 md:p-6 shadow-md'> 
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <a className='text-xl font-bold mb-4 md:mb-0' href="#">Mystery Message</a>
                {
                    session ? (
                        <>
                         <span className='mr-4'> Welcome,{user?.username || user?.email}</span>
                         <Button className='w-full md:w-auto ' onClick = {()=>signOut()}>Logout</Button></>
                       
                    ) : (<Link href='/sign-in'>
                        <Button className='w-full md:w-auto '>Login</Button>
                    </Link>)
                }
            </div>
        </nav>
    )
}
export default Navbar
//useSession client side me kaam krta h server side me nhi therefo re apn nen client component bnaya



