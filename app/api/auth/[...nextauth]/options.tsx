//credentials providers sabse tough wala tha isliye apan ne vo implement kiya baaki github facebook koi bhi easily kr skte h ,github wagrah hota toh nextauth authorize kr deta lekin yaha apan ne credentials liye isliye authorize khud lgana pdega
//(auth) ka kya matlab bracket lgane se kya farak aaaya 
//new interface declared in next-auth.d.ts in types folder jisme structure define krenge
//path jo define kiya h apan ne api->auth->[...nextauth]->options and route ye do files bnani h  ... documentation me diya h make sure usme jo path h wahi apan leke chle
//next-auth-documentation-configuration-callbacks we will use session and jwt for credential provider go to providers section
//.env h kya ?
// 4 tarike se authentication mongodb, Oauth(gmail, discord etc),Email, Credentials(username and password aage se jo google accoutnbnate waqt kiya tha )
//apan ko facebook se login krwana ho to we can use facebook provider
//bcrypt for password, db to connect krna hi pdega or model to chahiye hi 
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
//user ka password check krwayenge for signing in toh bycrypt lgayenge
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
//apan ke custom info chahiye not just mail and password like user is vrified or not ye sab bhi 
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",

            name: 'Credentials',
            credentials: {
            identifier: { label: "Email or Username", type: "text", placeholder: "" },
            password: { label: "Password", type: "password" }
          },
          //signinschema file me check krna identifier and password daal rkha for identification
          async authorize(credentials, any):Promise<any> {
            await dbConnect();
            try{
              const user = await UserModel.findOne(
                //query searches for a user in the database with an email or username that matches the provided email (from the credentials object The $or operator checks if either field matches the input.
                {
                  $or : [
                    //to allow users to log in with either their email or their username n but in credentials we took only username ... therefore credentials.email use kiya bus
                    {email: credentials.identifier},
                    {username:credentials.identifier}
                  ]
                }
              )
              if(!user){
                throw new Error('No user found with this email')
              }
              if(!user.isVerified){
                throw new Error('Please verify your account before login')
              }
            
            const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
            if(isPasswordCorrect){
              return user;
            }
            else{
              throw new Error('Incorrect Password');
            }
          }
          //By changing email to identifier and usme email and username dono add kr diye
            catch(err:any){
              throw new Error(err)
            }
                
            }
          }
        )
      ],
      //ab apan jayenge pages pe in documentation, vo directly page de dega apan ko design bhi nhi krna pdega, signup k apan khud bnayenge(nextauth se bhi bna skte h )
      //token ko  modify krenge, similarly session interface define krenge 
      //differnce between  jwt and session
//jwt?
//session, token , user difeerence teeno se data nikal skte h 
      callbacks:{
        async jwt({ token, user }) {
          if(user){
            token._id = user._id?.toString()
            token.isVerified = user.isVerified;
            token.isAcceptingMessage = user.isAcceptingMessage;
            token.username = user.username
          }
          return token
        },
        async session({ session, token }) {
          if(token){
            session.user._id = token._id
            session.user.isVerified = token.isVerified
            session.user.isAcceptingMessage = token.isAcceptingMessages
            session.user.username = token.username
  
          }
          //session ke andar user = token
          return session
        },
      },
      
      pages:
      {
         signIn:'/sign-in'
      },
      session:{
        strategy:"jwt"
      },
      //ask why session and token ko edit kyukiya (taaki baar baar query nhi krni pde)
      //.env par jake pehle secret key define krdo .... (aisa kyu kiya nobody knows?)it is very important to give secret
      secret: process.env.NEXTAUTH_SECRET
      //fir apan aayenge calllbacks pe ye callbacks customize krne jroori h 
      //getter and setter function ek naam se define nhi ho skta 
    }
       //you are relying on the JWT strategy for session management with no adapter  If you ever want to switch to a database-based session strategy,  
      // JSON Web Tokens for session handling instead of storing session data in a database.       



