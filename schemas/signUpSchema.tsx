import {z} from 'zod'
//validation and error agar main length 2 nhi hui toh it will show error defined after comma
 export const usernameValidation = z
 .string()
 .min(2,"Username must be at least 2 charcters")
 .max(20,"Username must be no more than 20 letters")
 .regex(/^[a-zA-Z0-9]+$/,"username must not contain special character")
// regex me check kr rha 0-9, a-z and A-Z hi h n username me 
// teen char cheeze use krni h toh oject declare kiya(z.object) otherwise upar just string 
// upar usernameValidation ka schema bna diya fir neeche usko directly use kr liya
//In Zod, you define schemas to express these rules, and the library checks if the data conforms to them.
export const signUpSchema = z.object({
    username:usernameValidation,
    email:z.string().email({message:'Invalid email address'}),
    password: z.string().min(6,{message:"password must be atleast 6 characters"})
})