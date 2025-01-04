//The Resend library is an email-sending service, typically used for managing transactional emails (like account verification, password reset emails, etc.). 
import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);
//check resend ki jagah or kya use kr skte h for sending verification mails and how will the code change
//.env me se RESEND_API_KEY  aa rhi h documantation me code dekh lena