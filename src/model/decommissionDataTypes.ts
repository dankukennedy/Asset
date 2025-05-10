import  {z}  from 'zod'

 export const createDecoSchema = z.object({
    dateOfDec:z.string().datetime({message:"date cannot be left empty"}),
    reason: z.string().min(2,{message:"Reason cannot be less than 2 characters"}),
    createdById: z.string().nonempty({message:"Created user cannot be left empty"}),
    decoId:z.string().nonempty({message:"Decommission Id user cannot be left empty"})
 })
 export type createDecoSchemaInput = z.infer<typeof createDecoSchema>

 export const updateDecoSchema = z.object({
    id:z.string().nonempty({message:"De commission Id cannot be left empty"}),
    dateOfDec:z.string().datetime({message:"date cannot be left empty"}),
    reason: z.string().min(2,{message:"Reason cannot be less than 2 characters"}),
    createdById: z.string().nonempty({message:"Created user cannot be left empty"}),
    decoId:z.string().nonempty({message:"Decommission Id user cannot be left empty"})
 })
 export type updateDecoSchemaInput = z.infer<typeof updateDecoSchema>

 export const findDecoSchema = z.object({
    id:z.string().nonempty({message:"De commission Id cannot be left empty"}),
  
 })
 export type findDecoSchemaInput = z.infer<typeof findDecoSchema>