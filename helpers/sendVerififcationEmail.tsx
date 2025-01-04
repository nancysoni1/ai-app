import {resend} from "@/lib/resend";
import VerificationEmail from "@/emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
//apan templates bnayenge (uthanyenge from documentation)
// we will make emails folder usem verificationemail.tsx file or bhi bhot saare mails agar apan ko chahiye
//now we will make a folder types anf ek custom folder design krenge and usko naam de diya types
//ek function jisme emailid, name and code hoga or vo apan usko bhejenge
//try catch emails fail hona very common 
export async function sendVerificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse>{
    try{
        //ab yaha apana copy krenge documentation se async apna ne upar lga diya h, mame changes in the copie dcode according to our need
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({ username, otp:verifyCode }),
          });
        return {success:true,message:'Verification email send successfully'}
    }
    catch(emailError){
        console.error("Error sending verification email")
        return {success:false,message:'Failed to send  verififcation email'}
    }

}
//ye sab hogya ab apan pehli baar api likheenge 