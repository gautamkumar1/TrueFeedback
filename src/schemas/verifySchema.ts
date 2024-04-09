
import { z } from "zod";

export const verifySchema = z.object({
    code:z.string().length(6,{message:"Verfication Code Must be at least 6 digits"}),
})

export default verifySchema;