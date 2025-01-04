import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request){
    await dbConnect()
    try{
 const {username,code}  = await request.json()
 const decodedUsername = decodeURIComponent(username)
 const user = await UserModel.findOne({username:decodedUsername})
if (!user){
    return Response.json(
        {
            success: false,
            message:"Error checking username"
        },
        {status:500}
    )
}
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message:"Account verified successfully"
                },
                {status:200}
            )
        }
        else if (!isCodeNotExpired){
            return Response.json(
                {
                    success: false,
                    message:"Verification code expired please sign in again"
                },
                {status:400}
            )
        }
        else{
            return Response.json(
                {
                    success: false,
                    message:"Incorrect verification code"
                },
                {status:400}
            ) 
        }


    }
    catch (error){
        console.error("Error checking user",error)
        return Response.json(
            {
                success: false,
                message:"Error checking username"
            },
            {status:500}
        )
    }
}
//after this is done we will work on messages do tARAH KI API LIKHNI PDEGI 1 at is SimplePOST - jo status ko update krde 2nd is Simple GET - jo sirf btade status kya h  
//ek api lgegi jise saare messages  aa jaye jisme mongoDB ki agregation pipeline lgegi... toh apan ko sessions ke through pehle janana pdega konsa user logged in h 