import {z} from  'zod'

export const  createTransferSchema = z.object({
    userTransferToId: z.string().nonempty({message:"User transfer to cannot be empty"}),
    transferDate : z.string().datetime().nonempty({message:"Transfer Date cannot be empty"}),
    createdById : z.string().nonempty({message:"Created User  cannot be empty"})
})
export type createTransferSchemaInput = z.infer<typeof createTransferSchema>

export const findTransferSchema = z.object({
 id: z.string().nonempty({message:"Transfer Id  cannot be empty"})
})
export type findTransferSchemaInput = z.infer<typeof findTransferSchema>

export const  updateTransferSchema = z.object({
    id :z.string().nonempty({message:" Transfer Id cannot be empty"}),
    userTransferToId: z.string().nonempty({message:"User transfer to cannot be empty"}),
    transferDate : z.string().datetime().nonempty({message:"Transfer Date cannot be empty"}),
    createdById : z.string().nonempty({message:"Created User  cannot be empty"})
})
export type updateTransferSchemaInput = z.infer<typeof updateTransferSchema>