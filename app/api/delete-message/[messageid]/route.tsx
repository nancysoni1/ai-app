import UserModel from "@/model/User";
import {User} from "next-auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";




export async function GET(request: Request, {params}:{params:{messageid:string}}){
    const messageId = params.messageid
    await dbConnect()
     const session = await getServerSession(authOptions)
       const user:User  = session?.user as User
    //user authenticated hone jroori h for deletion
       if(!session || !session.user)//
       {
        return Response.json(
            {
                success:false,
                message:"Not Authenticated"
            },
            {status :401}
        )
       }
       try {

       //updateOne cause  array me se ek hi value htani h ... pehle parameter kis basis me add kre first aata h id ke basis pe jo milegi user mein (messahge wali id nhi leni user wali leni h ) 
       const updateResult = await UserModel.updateOne(
        {_id: user._id},
        {$pull: {messages: {_id: messageId}}}
       )
       //modify cout = 0 matlab kuch modify hua hi nhi 
       if(updateResult.modifiedCount ==0 ){
        return Response.json(
            {
                success:false,
                message:"Message not foud or already deleted"
            },
            {status :401}
        )
       }
       return Response.json(
        {
            success:true,
            message:"Message successfully deleted "
        },
        {status :200}
    )
       } catch (error) {
        console.log("Error in delete message route", error)
        return Response.json(
            {
                success:false,
                message:"Error deleting message"
            },
            {status :500}
        )
        
       }
  
}

