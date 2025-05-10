import {z} from 'zod'

export  const  createReportSchema = z.object({
    createdById:z.string().nonempty({message:"Created by User Cannot be left Empty"}),
    reportId : z.string().nonempty({message:"Report Asset Cannot be left empty"}),
    name :z.string().min(2,{message:"Report name cannot be left empty"}).nonempty({message:" Year Cannot be left empty"})
})
export  type createReportSchemaInput = z.infer<typeof createReportSchema>

export  const  findReportSchema = z.object({
    id: z.string().nonempty({message:"Report Id Cannot be empty"}),
})
export  type findReportSchemaInput = z.infer<typeof findReportSchema>

export  const  updateReportSchema = z.object({
    id: z.string().nonempty({message:"Report Id Cannot be empty"}),
    createdById:z.string().nonempty({message:"Created by User Cannot be left Empty"}),
    reportId : z.string().nonempty({message:"Report Asset Cannot be left empty"}),
    name :z.string().min(2,{message:"Report name cannot be left empty"}).nonempty({message:" Year Cannot be left empty"})
})

export  type updateReportSchemaInput = z.infer<typeof updateReportSchema>