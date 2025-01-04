// yaha apan ko do cheeze chahiyegi switch and separator
// agar apan ne react hook form use kr liye to poor eproject mewwahi use krenge vo standard hota h 
'use client'
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {Message, User} from "@/model/User"
import {useState,useCallback, useEffect} from "react"
import { useToast } from "@/hooks/use-toast"
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import axios,{AxiosError} from "axios"
const page = () => {
    const [message, setMessages] = useState<Message[]>([])
    const [isLoading,setIsLoading] = useState(false)
    const [isSwitchLoading,setIsSwitchLoading] = useState(false)
    const {toast} = useToast()
    //this handledeletemessage function messages ko filter krtah fir usem messaaaeg id dhundhta h or foir se push kr drta h 
    const handleDeleteMessage = (messageId: string) => {
        setMessages(message.filter((message)=>message._id !== messageId))
    }
    const {data: session} = useSession()
    const form = useForm({
        resolver: zodResolver(AcceptMessageSchema)
    })
    const{register, watch, setValue} = form;
    //watch ek method h jo accept messages me milega
    //what does it do ?
    const acceptMessages = watch('acceptMessages');
    //usecallback ko chahiye dependency array 
    const fetchAcceptMessage = useCallback(async()=>{
        setIsSwitchLoading(true)
        try {
           const response = await axios.get<ApiResponse>('/api/accept-messages')
           setValue('acceptMessages',response.data.isAcceptingMessage)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            console.error("Error fetching message settings:", error)

            toast({
                title:"Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant:"destructive"
            })
        }
        finally {
            setIsSwitchLoading(false)
        }
    },[setValue])
    
    const fetchMessages = useCallback(async (refresh: boolean = false) => {
        setIsLoading(true)
        setIsSwitchLoading(false)
        try {
            const response =  await axios.get<ApiResponse>('/api/get-messages')
            setMessages(response.data.messages || [])
            if(refresh){
                toast({
                    title:"Refreshed Messages",
                    description: "Showing latest messages" ,
                })
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title:"Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant:"destructive"
            })
        }finally{
            setIsSwitchLoading(false)
            setIsLoading(false)
        }

}, [setIsLoading,setMessages])

useEffect(() => {
  if(!session||!session.user){
    return fetchMessages();
  }
    
fetchAcceptMessage();
},[session,setValue, fetchAcceptMessage,fetchMessages]);
//handle switch change
const handleSwitchChange = async () => {
    try{
        // kaha pe request fire krni h 
        const response  = await axios.post<ApiResponse>('/api/accept-messages' ,{acceptMessages: !acceptMessages})
        setValue('acceptMessages',!acceptMessages)
        toast({
            title:response.data.message,
            variant:'default'
        })
    }
    catch(error){
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
            title:"Error",
            description: axiosError.response?.data.message || "Failed to fetch message settings",
            variant:"destructive"
        })
    }
}

// const usernaem and {username} me kya difference
// ab apan  ko do kaam krne pdenge post url y abase url construct krna pdega ki actually mein user h kaha pe local host pe h varcel pe h /custom domain pe h
// base url ek client component h toh find out usse kaise nikala ja skta h  and profile ulr hume bnana pdega

const {username} = session?.user as User
const baseUrl = `${window.location.protocol}//${window.location.host}`

const profileUrl = `${baseUrl}/u/${username}`
const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
        title:"URL copied",
        description: "Profile URL have been copied to clipboard"
    })
}
//value pe loop lgake component render krna

if(!session || !session.user){
    return <div>Please login</div>
}
}
