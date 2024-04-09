
import { z } from "zod";

export const accpetMessageSchema = z.object({
    accpetMessage: z.boolean()
})

export default accpetMessageSchema;