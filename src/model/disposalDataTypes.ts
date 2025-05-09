import {z} from 'zod'

export const createDisposalSchema = z.object({
    userTransferTo: z.string().min(4,{message:"User Dispose to name cannot be less than 4 characters"}).nonempty({message:"User transfer to cannot be left empty"}),
    createdById: z.string().nonempty({message:"Created By User cannot be empty"}),
    disposeDate: z.string().datetime().nonempty({message:"Dispose Date cannot be empty"}),
    disposeId: z.string().nonempty({message:"Dispose Id cannot be left empty"}),
})
export type createDisposalSchemaInput = z.infer<typeof createDisposalSchema>

export const findDisposalSchema = z.object({
    id: z.string().nonempty({message:"Disposal Id cannot be left empty"}),

})
export type findDisposalSchemaInput = z.infer<typeof findDisposalSchema>

export const updateDisposalSchema = z.object({
    id: z.string().nonempty({message:"Dispose Id cannot be left empty"}),
    userTransferTo: z.string().min(4,{message:"User Dispose to name cannot be less than 4 characters"}).optional(),
    createdById: z.string().optional(),
    disposeDate: z.string().datetime().optional(),
    disposeId: z.string().optional(),
})
export type updateDisposalSchemaInput = z.infer<typeof updateDisposalSchema>
