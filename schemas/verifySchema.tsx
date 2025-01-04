//nextjs all time run nhi hoti jaise jaise chahiye hoti h waise waise run hoti h  isliye jab sirf pure backened krte h toh its easy
//jab nextjs use kr rhe to pehle check krlo ki database already connected(database connection lena hi pdta h ) toh nhi agar nhi ho tbhi request bhejni
//verifyschema means verfiycode schema ki vo 6 digit h n 
import {z} from "zod"
export const verifySchema = z.object({
 code: z.string().length(6,'Verification code must be 6 digits')
 })
 