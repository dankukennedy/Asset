import {z} from 'zod'

export const createAllocationSchema =  z.object({
    userDeptId:z.string({message:"Department cannot be left empty"}),
    unit: z.string().min(2,{message:"Unit name cannot be left empty"}).max(60,{message:"Unit name cannot exceed 60 characters"}).nonempty({message:"Unit name cannot be left empty"}),
    assetId: z.string().nonempty({message:"Asset cannot be left empty"}),
    usernameId: z.string().nonempty({message:"Asset User (username) cannot be left empty"}),
    labelId : z.string().nonempty({message:"Room Label or Number cannot be left empty"})
})
export type createAllocationSchemaInput = z.infer<typeof createAllocationSchema>

export const findAllocationSchema =  z.object({
    id: z.string().nonempty({message:"Allocation Id cannot be left empty"}),
})
export type findAllocationSchemaInput = z.infer<typeof findAllocationSchema >


export const updateAllocationSchema =  z.object({
    id: z.string().nonempty({message:"Allocation Id cannot be left empty"}),
    userDeptId:z.string({message:"Department cannot be left empty"}),
    unit: z.string().min(2,{message:"Unit name cannot be left empty"}).max(60,{message:"Unit name cannot exceed 60 characters"}).nonempty({message:"Unit name cannot be left empty"}),
    assetId: z.string().nonempty({message:"Asset cannot be left empty"}),
    usernameId: z.string().nonempty({message:"Asset User (username) cannot be left empty"}),
    labelId : z.string().nonempty({message:"Room Label or Number cannot be left empty"})
})
export type updateAllocationSchemaInput = z.infer<typeof updateAllocationSchema>