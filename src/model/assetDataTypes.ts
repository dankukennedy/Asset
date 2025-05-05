import {z} from 'zod'

export const assetDataSchema = z.object({
    category : z.string().min(4,{message:"category cannot be less than 4 Characters"}).max(40,{message:"category cannot be more than 40 Characters"}).nonempty({message:"category cannot be empty"}),
    type : z.string().min(4,{message:"type cannot be less than 4 Characters"}).max(40,{message:"subType cannot be more than 40 Characters"}).nonempty(),
    subType : z.string().min(4,{message:"subType cannot be less than 4 Characters"}).max(40,{message:"subType cannot be more than 40 Characters"}).optional(),
    model : z.string().min(4,{message:" model cannot be less than 4 Characters"}).max(40,{message:"model cannot be more than 40 Characters"}).optional(),
    vendor : z.string().min(4,{message:"vendor cannot be less than 4 Characters"}).max(40,{message:"vendor cannot be more than 40 Characters"}).nonempty({message:"vendor cannot be empty"}),
    embossCode : z.string().min(4,{message:"emboss code cannot be less than 4 Characters"}).max(40,{message:"emboss code cannot be more than 40 Characters"}).optional(),
    name : z.string().min(4,{message:"name cannot be less than 4 Characters"}).max(30,{message:"name cannot be more than 30 Characters"}).nonempty({message:"name cannot be empty"}),
    serialNo : z.string().min(6,{message:"serial number cannot be less than 6 Characters"}).max(30,{message:"serial number cannot be more than 30 Characters"}).optional(),
    details : z.record(z.unknown({message:"must be json format"})).optional()
})
export type assetDataSchemaInput = z.infer<typeof assetDataSchema>

export const assetUpdateDataSchema = z.object({
    id: z.string().nonempty({message:"Id is required"}),
    category : z.string().min(4,{message:"category cannot be less than 4 Characters"}).max(40,{message:"category cannot be more than 40 Characters"}).nonempty({message:"category cannot be empty"}),
    type : z.string().min(4,{message:"type cannot be less than 4 Characters"}).max(40,{message:"subType cannot be more than 40 Characters"}).nonempty(),
    subType : z.string().min(4,{message:"subType cannot be less than 4 Characters"}).max(40,{message:"subType cannot be more than 40 Characters"}).optional(),
    model : z.string().min(4,{message:" model cannot be less than 4 Characters"}).max(40,{message:"model cannot be more than 40 Characters"}).optional(),
    vendor : z.string().min(4,{message:"vendor cannot be less than 4 Characters"}).max(40,{message:"vendor cannot be more than 40 Characters"}).nonempty({message:"vendor cannot be empty"}),
    embossCode : z.string().min(4,{message:"emboss code cannot be less than 4 Characters"}).max(40,{message:"emboss code cannot be more than 40 Characters"}).optional(),
    name : z.string().min(4,{message:"name cannot be less than 4 Characters"}).max(30,{message:"name cannot be more than 30 Characters"}).nonempty({message:"name cannot be empty"}),
    serialNo : z.string().min(6,{message:"serial number cannot be less than 6 Characters"}).max(30,{message:"serial number cannot be more than 30 Characters"}).optional(),
    details : z.record(z.unknown({message:"must be json format"})).optional()
})
export type assetUpdateDataSchemaInput = z.infer<typeof assetUpdateDataSchema>


export const findAssetDataSchema = z.object({
    id: z.string().min(4,{message:"asset id cannot be less than 4 characters"}).nonempty()
})
export type findAssetDataSchemaInput = z.infer<typeof findAssetDataSchema>