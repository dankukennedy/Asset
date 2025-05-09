import {z} from 'zod'

export const createRoomSchema = z.object({
  label: z.string().min(2,{message:"Room Label cannot be less than 2 characters eg. to enter 1 use 01 for input "}).max(10,{message:"Room label more than 10 letters"}).nonempty({message:"Room label cannot be empty"}),
  createdById: z.string().nonempty({message:"User Id cannot be empty"})
})
export type createRoomSchemaInput = z.infer<typeof createRoomSchema>

export const updateRoomSchema = z.object({
  id: z.string().nonempty({message:"Room Id cannot be empty"}),
  label: z.string({message:"Room label cannot be empty"}).min(2,{message:"Room Label cannot be less than 2 characters eg. to enter 1 use 01 for input "}).max(10,{message:"Room label more than 10 letters"}).optional(),
  createdById: z.string({message:"User Id cannot be empty"}).optional()
})
export type updateRoomSchemaInput = z.infer<typeof updateRoomSchema>

export const findRoomSchema = z.object({
  id: z.string().nonempty({message:"Room Id cannot be empty"})
})
export type findRoomSchemaInput = z.infer<typeof findRoomSchema>
