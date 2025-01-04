//dekh lena ye ye kyu import kiye 
//difference between get and post 
import dbConnect from "../../../lib/dbConnect";
import UserModel from "../../../model/User";
import {z} from "zod"
import { usernameValidation } from "../../../schemas/signUpSchema";
//kyuki ab apne paas validation ke liye usernamevalidation schema h toh isse ek query schema bnate  h jab bhi check krwana ho ki ye wala variable or syntax check krwate h 
// is query object  me currrently ek hi parameter hoga or vo fulfill krna chahiye usernameValidation wale criteria ko ab apan ko get method likhna h jiise pta chal ske ye username valid h ya nhi h , signin par click krenge tab to pta chlega hi uske alawa just likhne se
// username check krenge url se vo url ko ek query bhej dega
//sirf username h to username validation vo fullfill rkna chahiye
const UsernameQuerySchema = z.object({
    username: usernameValidation
})
export async function GET(request: Request){

    await dbConnect()
    try{
         const {searchParams} = new URL(request.url)
         //querParam ka ek object bnaya h directly nhi declare kiya 
         const queryParam = {
            usernaem: searchParams.get('username')
         }
         //validaet with zod
         const result = UsernameQuerySchema.safeParse(queryParam)
         if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message : usernameErrors?.length > 0 ? usernameErrors.join(', ')
                :'Invalid query parameters',
            }, {status:400})
         }
         const {username} = result.data
         const existingVerifiedUser = await UserModel.findOne({username,isVerified:true})

         if (existingVerifiedUser){
            return Response.json({
                success:false,
                message: 'Username is already taken',
            },{status:400})
         }
         return Response.json({
            success:true,
            message:'Usernaem is unique',
         },{status:400})
    }
    catch(error){
        console.error("Error checking username",error)
        return Response.json(
            {
                success: false,
                messaeg:"Error checking username"
            },
            {status:500}
        )
    }
}

