// session apne aap nhi chlta usko chahiye auth options
//authOptions???
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth";
//get request , post request dono bnani pdegi
export async function POST(request: Request){
   const session = await getServerSession(authOptions)
   const user = session?.user

   if(!session || !session.user){
    return Response.json(
        {
            success:false,
            message:"Not Authenticated"
        },
        {status :401}
    )
   }
   const userId = user._id;
   const {acceptMessages} = await request.json()
   try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, 
            {isAcceptingMessages: acceptMessages},
            {new: true}
        )
        if(!updatedUser){
            return Response.json(
                {
                    success: false,
                    message:"failed to update user status to accept messages"
                },
                {status :401}
            )
        }
        return Response.json(
            {
                success: true,
                message:"Messages acceptance status acceptance statius updated successfully",
                updatedUser
            },
            {status :200}
        )
   }
   catch(error){
    console.log("failed to update user status to accept messages")
    return Response.json(
        {
            success:false,
            message:"failed to update user status to accept messages"
        },
        {status :500}
    )
}
}
// ye hogya apna POST request ab apan ko bnana h GET request isme bus database se query krke bhe dete h 
export async function GET(request: Request){
    const session = await getServerSession(authOptions)
    const user = session?.user
 
    if(!session || !session.user){
     return Response.json(
         {
             success:false,
             message:"Not Authenticated"
         },
         {status :401}
     )
    }
    const userId = user._id;
    try {
        const foundUser = await UserModel.findById(userId)
    if(!foundUser){
        return Response.json(
            {
                success: false,
                message:"User not found"
            },
            {status :404}
        )
    }
    return Response.json(
        {
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage
        },
        {status :200}
    )
    } 
    catch (error) {
        console.log("failed to update user status to accept messages")
    return Response.json(
        {
            success:false,
            message:"Error in getting messag acceptance status"
        },
        {status :500}
    )
    }

}