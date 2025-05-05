import {z} from 'zod'

export const assetDataSchema = z.object({
    category : z.string().min(4,{message:"category cannot be less than 4 Characters"}).max(40,{message:"category cannot be more than 40 Characters"}).nonempty(),
    type : z.string().min(4,{message:"type cannot be less than 4 Characters"}).max(40,{message:"subType cannot be more than 40 Characters"}).nonempty(),
    subType : z.string().min(4,{message:"subType cannot be less than 4 Characters"}).max(40,{message:"subType cannot be more than 40 Characters"}).optional(),
    name : z.string().min(6,{message:"name cannot be less than 4 Characters"}).max(30,{message:"name cannot be more than 30 Characters"}).nonempty(),
    serialNo : z.string().min(6,{message:"serial number cannot be less than 6 Characters"}).max(30,{message:"serial number cannot be more than 30 Characters"}).optional(),
    details : z.record(z.unknown({message:"must be json format"})).optional()
})
export type assetDataSchemaInput = z.infer<typeof assetDataSchema>