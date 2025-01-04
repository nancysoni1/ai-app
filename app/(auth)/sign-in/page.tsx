 'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import {useState} from "react"
//debounding krni pdegi taaki har type par response nhi jaaye therefore we will use hook
//bydefault username is empty
// we will use usehook.tx to bring username
//sign in pura next auth se use kr rhe 
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import {useRouter} from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios,{AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";


const page = () => {
  const {toast} = useToast();
  const router = useRouter();

  // now we will do zod implmentation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues:{
      identifier: '',
      password: ''
    }
})
//onsubmit we will not copy as of sign-up(poora manual) cause yaha apan next auth use kr rhe 
const onSubmit = async (data: z.infer<typeof signInSchema>)=>{
  const result = await signIn('credentials',{
    redirect: false,// aap mat krwao redirect hum krwa lenge
    identifier: data.identifier,
    password: data.password
  })
  // agar result me koi error h then if statement 
  if(result?.error){
    toast({
      title:"Login failed",
      description:"Incorrect username or password",
      variant : "destructive"
    });
    return;
     
  }
  // agar rsult me url milta h toh condition true aign i n krn ek ebaad url hi waapis milta h ... redirect kr denge dashbord pe
 if(result?.url)
 {
  router.replace('/dashboard');
 
 }
  
}

  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6"> Join mystery message </h1>
      <p className="mb-4">Sign In to strat your anonymous adventure</p>

      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

<FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email/Username</FormLabel>
              <FormControl>
                <Input placeholder="email/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input  type = "password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">SignIn</Button>
      </form>
    </Form>
      <div className="text-center mt-4">
        <p>
          Not a member?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
          Sign in</Link>
        </p>
      </div>
    </div>
    </div>
  );
  
}


