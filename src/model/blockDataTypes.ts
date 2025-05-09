import {z} from 'zod'

export const blockSchema = z.object({
    userId: z.string().nonempty({message:"Id is required"}),
    name: z.string().min(1,{message:"block name cannot be less than a character"}).nonempty(),
})
export type blockSchemaInput = z.infer<typeof blockSchema>

export const updateBlockSchema = z.object({
    id: z.string().nonempty({message:"block id cannot be left empty"}),
    name: z.string().min(1,{message:"block name cannot be less than a character"}).optional(),
})
export type updateBlockSchemaInput = z.infer<typeof updateBlockSchema>

export const findBlockIdSchema = z.object({
    id: z.string().nonempty({message:"block id cannot be left empty"}),
})
export type  findBlockIdSchemaInput = z.infer<typeof findBlockIdSchema>