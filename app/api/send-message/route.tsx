// default import hota h vo we can directly write otherwise we first have to mention it in n a curly bracket
//message koi bhi bhej skta h toh us hisab se design krna pdega
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
export async function POST( request: Request){
    await dbConnect()
    // try catch lgakr user ko find krenge
    const {username, content} = await request.json()
    try{
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json(
                {
                    success:false,
                    messaeg:"user not found"
                },
                {status:404}
            )
        }
        // ya to user mila nhi agar milgya to check krna pdega ki vo accept kr rha h ya nhi 
        if (!user.isAcceptingMessage){
            return Response.json(
                {
                    success:false,
                    messaeg:"user  is not accepting message"
                },
                {status:403}
            )
        }
        const newMessage = { content, createdAt: new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json(
            {
                success:true,
                messaeg:"Message sent successfully"
            },
            {status:403}
        )
    }
    catch(error){
       console.log(" Error adding messaegs ", error)
       return Response.json(
        {
            success:false,
            messaeg:"Internal server error"
        },
        {status:500}
    )
    }
}

// now we will make suggest message and  integrate ai