import {z} from 'zod'

export const deptSchema = z.object({
    userId: z.string().nonempty({message:"Id is required"}),
    name: z.string().min(2,{message:"department cannot be less than two characters"}).max(60,{message:'"department name cannot be more than 60 characters'}).nonempty({message:"department cannot be left empty"}),
    blockId: z.string().min(6,{message:"block id cannot be less than 8"}).nonempty({message:"block id cannot be left empty"})
})
export type deptSchemaInput =  z.infer<typeof deptSchema>

export const updateDeptSchema = z.object({
    id: z.string().min(6,{message:"block id cannot be less than 8"}).nonempty({message:"block id cannot be left empty"}),
    name: z.string().min(2,{message:"department cannot be less than two characters"}).max(60,{message:'"department name cannot be more than 60 characters'}).optional(),
    blockId: z.string().min(6,{message:"block id cannot be less than 8"}).optional()
})
export type updateDeptSchemaInput =  z.infer<typeof updateDeptSchema >

export const findDeptIdSchema = z.object({
    id: z.string().min(6,{message:"block id cannot be less than 8"}).nonempty({message:"block id cannot be left empty"})
})
export type findDeptIdSchemaInput =  z.infer<typeof findDeptIdSchema>