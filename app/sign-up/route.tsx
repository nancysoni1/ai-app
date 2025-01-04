//database connection har ek route par lgta h kyuki nextjs edge pe chlta h  
//bcrypt.js is a JavaScript library used for hashing and verifying passwords in Node.js applications. It is a pure JavaScript implementation of the bcrypt hashing algorithm, which is widely used for securely storing passwords(it is an dev dependecy)
//Bcrypt performs hashing with an adjustable "cost factor," which defines the number of iterations or rounds applied to the hash function(here 10) but it makes it computationally slow
//JSON response is a server sends back to a client after receiving a request
// jab bhi nextjs ka json response lganyenge await lgana hi lgana h , request json se email password jo bhi lena h vo le lenge 
//The await keyword in JavaScript is used with asynchronous functions to pause the execution of code until a Promise is resolved or rejected. It allows you to write asynchronous code in a way that looks and behaves like synchronous code, making it easier to read and work with.

/*isme apan ko ye ye kaam krna h 
if existinguser by email exists then - !if existing user by email.is verififed then success :false...
!else save the updated user
!end if
else !create a new user with the provided details 
!save the new user 
!end if  
*/ 
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerififcationEmail";
export async function POST(request: Request){
    await dbConnect()
    try{
        const {username,email,password} = await request.json()
        const existingUserVerificationByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
        //pehle username and verified jo hoga usko retunr kr dega 
        //success false as user milgya to aapka registratin nhi ho skta 
        if(existingUserVerificationByUsername){
return Response.json({
    success:false,
    message:"Username is already taken"
},
{status:400})
        }
       const existingUserByEmail = await UserModel.findOne({email}) 
       //generating otp , math.random generate random number between 0 to 1
       const verifyCode = Math.floor(100000+Math.random()*900000).toString()
       if(existingUserByEmail){
         if (existingUserByEmail.isVerified){
            return Response.json({
                success: false,
                messaeg:"User already existwith this email"
            },
        {status:400})
         }
         else{
            const hasedPassword = await bcrypt.hash(password,10)
            existingUserByEmail.password = hasedPassword;
            existingUserByEmail.verifyCode= verifyCode;
            existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000)
            await existingUserByEmail.save()
         }
       }
       else{
        const hasedPassword = await bcrypt.hash(password,10)
        //ek ghnte ki expiry rkh dete h otp verification ki , to pehle curretn date time lenge fir usko +1 de dena
        //question is apan expirydat eko const declafrekr rhe par baadme usko change kr rhe(how?) and will make a new usermodel or usko save kr denge agar user save hoggya to verification mail bhi bhejna pdega
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours()+1)
        const newUser = new UserModel({
            username,
            email,
            password:hasedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified:false,
            isAcceptingMessage:true,
            messages: []
        })
        await newUser.save()
       }
       //send verificaton email
       const emailResponse = await sendVerificationEmail(email,username,verifyCode)
       if(!emailResponse.success){
        return Response.json({
          success:false,
          message: emailResponse.message
        },
    {
      status: 500
    })
       }
       //second case finaaly email chla gya 
       return Response.json({
        success:true,
        message: "User registered successfully. Please verify your email"
      },
  {
    status: 201
  })

    }
    catch(error){
        console.error('Error registering user', error)
        return Response.json(
            {
            success:false,
            message:"Error registering user"
            },
            {
                status:500
            }
            
        )
    }
}
//now first we will find email h ya nhi -> uske baad verified h ya nhi therefore usermodel.findone
// ye sab hone ke baad ab apan use krenge nextauth apan install krenge npm install nextauth(authentication for nextjs) ... kya ky ainstall kiya h vo apna dekh skte h in package.json 
