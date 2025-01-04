import {Message} from "@/model/User";
//This defines the shape of an API response that your application might receive or send.
//It ensures type safety for responses, meaning you can only include fields explicitly defined in the interface
export interface ApiResponse{
    success: boolean;
    message:string;
    isAcceptingMessage ?: boolean;
    messages?:Array<Message>
}
    //isAcceptingMessage may not be relevant because the user's preferences for accepting messages are not yet set.
    //isAcceptingMessage becomes relevant to show whether the user allows receiving messages.
    // apiresponse interface declare krdiya ab aage use to make different responses like signuo, dashboard etc
    //isaccepting me  ? kyuki jab bhi apiresponse bhejunga to isaccepting bhejena hi pdega but signup me to isaccepting ka koi role nhi isliye optional isliye question mark now in next step we will import user.tsx from model
   // because there can be case ki apan ne database se bhot saare message collect kiye h and vo apan show krwana chahte h matlab user ko dashboard par dena hi h  to apan ek or optional declare krenge messages jo ki array hoga message ska isse apan ko type safety bbhi milegi(how no idea?)
 