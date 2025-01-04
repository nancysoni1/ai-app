//This code establishes a connection to a MongoDB database using the Mongoose library.
// apan ne database connect kr liya next task is to work with backedned (signup) verification usin gmail - create an api key on resend.com
import mongoose from "mongoose";
type ConnectionObject = {
    isConnected ?: number//optional h ye value ho bhi skti h or nhi bhi but agar hogi to number format me aayegi 
}
//hmare paas databae collection jo value return hoga vo ek Promise hoga, uske andar kya value aati h that doesnt matter therefor declared void
//mongoose.connect Returns a Promise because the database connection is asynchronous.If successful, it resolves with the connection object.

const connection: ConnectionObject = {}
//initially ye empty rhega therefore {} tabhi apan ne upar usse optional rkha 
 async function dbConnect():Promise<void>{
  if(connection.isConnected){
    console.log("Already connected to database");
    return
  }
  //if not connnecte try to connect to a new file MONGO_DB from .env file, process kro ya fir empty spring lelo ||''
  //readystate ek number hota h issi ko extrac krna tha
  //ya toh try rke ho hi jaye wrna catch run hhoga
  try{
    //db apne aap me ek array aata h 
    const db = await mongoose.connect(process.env.MONGODB_URI || '',{})
    connection.isConnected = db.connections[0].readyState
    console.log("DB connected successfully");
  }
  catch(error){
      console.log("Database connection failed", error);
      process.exit(1)
  }
 }
 export default dbConnect;

 
 //tsx me interface bnate h
 //isConnected optional h ya toh h nhi h toh number value hogi
//void matlab parwa nhi kis type ki value aa rhi
//async function automatically returns a Promise, Inside an async function, you can use the await keyword to pause execution until a promise resolves , async functions run asynchronously and don't block the execution of the rest of the code
//asynchronus mean perform long operations (e.g., fetching data) without blocking other code.
//we have native browser async functions example setTimeout