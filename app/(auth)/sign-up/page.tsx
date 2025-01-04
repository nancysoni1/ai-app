//ek providers ka knowledge ho ek call backs ka 

//will maKe a file an dfolder context->authprovider->session in nextauth.js->clientapi
//(auth) mean auth naam se route nhi hoga ... what does that mean
//apan ne database se data leke usko token , session sabme wrap kr diya
//difference between post data and get data post dat asend krna h get data nhi
// npm install axios
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import {useState} from "react"
//debounding krni pdegi taaki har type par response nhi jaaye therefore we will use hook
//bydefault username is empty
// we will use usehook.tx to bring username
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import {useRouter} from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios,{AxiosError} from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
const page = () => {
  const [username,setUsername] = useState('')
  const [usernameMessage,setUsernameMessage] = useState('')
  const [isCheckingUsername,setIsCheckingUsername] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const debounced = useDebounceCallback(setUsername, 300)
  // next we will add toast
  const {toast} = useToast()
  const router = useRouter();

  // now we will do zod implmentation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username : '',
      email: '',
      password: ''
    }
})
useEffect(() => {
  const checkUsernameUnique = async ()=> {
    if(username){
      setIsCheckingUsername(true)
      setUsernameMessage('')
      try{
         const response = await axios.get(`/api/check-username-unique?username = ${username}`)
         setUsernameMessage(response.data.message)
      }
      catch (error){
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(axiosError.response?.data.message ?? "Error  checking username")
      }
      finally {
        setIsCheckingUsername(false)
      }
    }
  }
  checkUsernameUnique()
},[username])
// get and post dono define krte h ask why
const onSubmit = async (data: z.infer<typeof signUpSchema>)=>{
  setIsSubmitting(true)
  try{
    const response = await axios.post<ApiResponse>('/api/sign-up', data)
    toast({
      title:'Success',
      description: response.data.message
    })
    router.replace(`/verify/${username}`)
    setIsSubmitting(false)
  }
  catch(error){
    console.error("Error in signup",error)
    const axiosError = error as AxiosError<ApiResponse>;
    let errorMessage = axiosError.response?.data.message 
    // jaise hi submit hua domain to as it is rhega and route will chnage to router.replace('/)
    // how to know where to use backticks and where commaas
    toast({
      title:'Sign up failed',
      description:errorMessage,
      variant:"destructive" 
      })
      setIsSubmitting(false)
  }
}
// destructured?
//formitem apan ko render krna hota h jab ye render krte h toh aoan ko milta h callback, field dat collect kr rha h further transfer
    //debouncing ka matlab yahi h ki time add krde 
  return(
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6"> Join mystery message </h1>
      <p className="mb-4">Sign up to strat your anonymous adventure</p>

      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field}
                onChange = {(e) => {
                  field.onChange(e)
                  debounced(e.target.value)
                }} />
              </FormControl>
              {isCheckingUsername && <Loader2 className=
            "animate-spin"/>}
            <p className={`text-sm ${usernameMessage === "Username is unique" ? 'text-green-500' : 'text-red-500'}`}>
                test{usernameMessage}
            </p>
              <FormMessage />
            </FormItem>
          )}
        />
    

<FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
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

        <Button type="submit" disabled={isSubmitting}>
          {
            isSubmitting ? (
              <>
              <Loader2 className = "mr-2 h-4 w-4 animate-spin "/>Please wait
              </>
            ) : (`Signup`)
          }
        </Button>

        </form>

      </Form>
      <div className="text-center mt-4">
        <p>
          lready a member?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
          Sign in</Link>
        </p>
      </div>

      </div>
    </div>
  )
  
}
// ctrl space dba kr  kuch bhi import kra skte directly need not to go upar again nad again to
//npw we will see otp verification
//route kya hoyte  h and why we have  adiffernet folder for every route
// dynamic data lete h folder bnate h square bracket se shuru krke 