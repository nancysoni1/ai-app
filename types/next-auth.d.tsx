//apan yaha bta de rhe h ki string hone wala h then we will use it in options.tsx->async jwt-> token_id(token id string bhi ho skti h)
import 'next-auth'
import { DefaultSession } from 'next-auth';
declare module 'next-auth'{
    interface User{
        _id? :string;
        isVerified?: boolean;
        isAcceptingMessage?:boolean;
        username?:string
    }
    //If you added fields directly to Session without using user: { ... } & DefaultSession['user'], you would overwrite the user object entirely, removing the default properties provided by next-auth
    //We’re adding _id, isVerified, isAcceptingMessage, and username properties to both the User and Session interfaces. these are custom property that we add so adding &default user will add custom and h o vo rhegi hi 
    //Adding custom fields to Session allows you to store and access user-specific information easily during authenticated sessions.
    interface Session{
        user: {
         _id? :string;
        isVerified?: boolean;
        isAcceptingMessage?:boolean;
        username?:string
        } & DefaultSession['user']
    }
}
//adapters? = adapters can be understood as components or patterns used to bridge or integrate two systems, modules, or components In TypeScript, module declaration adapters are used when importing or working with third-party libraries that don’t have TypeScript type definitions.
declare module 'next-auth/jwt'{
    interface JWT {
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username ?: string
    }
}