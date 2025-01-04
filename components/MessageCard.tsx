'use client'
import React from 'react'
import Link from 'next/link'
import{useSession, signOut} from 'next-auth/react'
import {User} from 'next-auth'
import {Button} from './ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import axios from 'axios'
  
  import { useToast } from '@/hooks/use-toast'
  import { ApiResponse } from "@/types/ApiResponse"
import { Message } from '@/model/User'

  type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId:string)=>void
  }
  //deleting is not an easy task cause vo messages array me saved h therefore we use pull operator of mongodb
  //square brackets bnane ka kya sense h and delete message me dynamic data a aa rha h toh uhow doe stha make a difference
  //bracket me daalne e route.tsx dynamic message k capture kr payega
const MessageCard = ({message,onMessageDelete}:MessageCardProps ) => {
    const {toast} = useToast()
    const handleDeleteConfirm = async () =>{
        //axios ek api response fire krega to given path
        //mongodb use kr rhe h toh har message ki id hogi 
        //onmessage delete me message id paas krdenge to vo waha s eldete kr dega
        try{
          const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
          toast ({
              title:response.data.message
          })
          onMessageDelete(String(message._id))
      }catch(error){
        toast({
          title: "Error",
          description: "Failed to delete the message.",
          variant: 'destructive'
        })
      }
        }
        
    return(
        <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
      
          <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-5 h-5">X </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        
      </Card>
    )
   

}
export default MessageCard




