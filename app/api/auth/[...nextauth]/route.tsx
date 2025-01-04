//NextAuth ka documentation ache se padh lena hota kyah ye nextasuth
import NextAuth from "next-auth";
import {authOptions} from "./options";
//NextAuth ke andar apan lete h saare ke saare options(NextAuth ek method h jo saare options leta h )
//handler emthod
const handler = NextAuth(authOptions)
// dono get and post kyu likha or kaise likhte h
export {handler as GRT, handler as POST}
// isme ye verbs likhni pdti h directly nhi kaam krta .. what doe sthat mean
// ab apan testing se pehle ek middleware(in nextjs) file bnayenge usko rkhte h apan source folder mein (middleware matlab jane se pehle milke jana kon kon si file se paas krwana h)
//middleware ki file root folder me rkhi jati h 