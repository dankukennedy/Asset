import {z} from 'zod'

export const assetUserSchema = z.object({
  name: z.string().min(2,{message:"Asset Username cannot less than 2 characters"}).max(60,{message:""}).nonempty(),
  userDeptId : z.string().min(4,{message:"user department id cannot be less than 4 characters"}).nonempty()
})
export type assetUserSchemaInput = z.infer<typeof assetUserSchema>

export const updateAssetUserSchema = z.object({
  id: z.string().nonempty({message:"Id is required"}),
  name: z.string().min(2,{message:"Asset Username cannot less than 2 characters"}).max(60,{message:""}).nonempty(),
  userDeptId : z.string().min(4,{message:"user department id cannot be less than 4 characters"}).nonempty()
})
export type updateAssetUserSchemaInput = z.infer<typeof updateAssetUserSchema>

export const  findAssetUserSchema = z.object({
    id: z.string().min(4,{message:"asset id cannot be less than 4 characters"}).nonempty()
})
export type findAssetUserSchemaInput = z.infer<typeof findAssetUserSchema>



