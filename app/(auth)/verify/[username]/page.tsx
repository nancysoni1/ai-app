'use client'
import { useToast } from "@/hooks/use-toast"
import { signUpSchema } from "@/schemas/signUpSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { verifySchema } from "@/schemas/verifySchema"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import axios from "axios"
import { AxiosError } from "axios"
import { Input } from "@/components/ui/input"


// typr anchoring - mujh eyaha jo dat a chahiye vo username hi chahiye
// how to decide useRouter import navigation se krna h ya router se
//axios krta kya h /

    
const VerifyAccount = () => {
  const router = useRouter()
    const params = useParams<{username: string}>()
    //destructure kr lete h
    const {toast} = useToast()

    // now we will do zod implmentation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
})

    const onSubmit = async(data: z.infer<typeof verifySchema>)=>{
        // now we will try to exttract data 
        try{
            const response = await axios.post('/api/verify-code',{
                username: params.username,
                code:data.code
            })
            toast ({
                title: "Success",
                description:response.data.message
            })
            router.replace('sign-in')
        }
        catch(error){
            console.error("Error in signup",error)
            const axiosError = error as AxiosError<ApiResponse>; 
            
            toast({
              title:'Sign up failed',
              description:axiosError.response?.data.message,
              variant:"destructive" 
              })
        }
    
    
}

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div  className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6"> Verify your account </h1>
      <p className="mb-4">Enter the verification code sent to your mail</p>

      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        /></form>
        </Form>
        <button
  type="submit"
  className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
>
  Verify
</button>

        </div>

        </div>
    )
}
export default VerifyAccount