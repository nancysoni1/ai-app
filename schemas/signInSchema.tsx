//Zod allows you to validate objects against the defined schema. For example, you can check if the input data matches the types and structure you defined, helps in ensuring type safety throughout your application, we can use our own validation also
import{z} from "zod"
export const signInSchema = z.object({
    identifier:z.string(),
    password:z.string(),
})