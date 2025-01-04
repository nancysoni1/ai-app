//zod library is used for validation and errors jaha schema nbhi kaam aa rha
// checkout the whole code without zod, schema in django 
import {z} from "zod"
export const messageSchema = z.object({
    content: z
    .string()
    .min(10,"Content must be at least 10 charcters")
 .max(300,"Content must be no more than 300 letters")
})