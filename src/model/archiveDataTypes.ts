import {z} from 'zod'

export  const  createArchiveSchema = z.object({
    createdById:z.string().nonempty({message:"Created by User Cannot be left Empty"}),
    archiveId: z.string().nonempty({message:"Archive Asset Cannot be left empty"}),
    year:z.string().datetime().nonempty({message:" Year Cannot be left empty"})
})
export  type createArchiveSchemaInput = z.infer<typeof createArchiveSchema>

export  const  findArchiveSchema = z.object({
    id: z.string().nonempty({message:"Archive Id Cannot be empty"}),
})
export  type findArchiveSchemaInput = z.infer<typeof findArchiveSchema>

export  const  updateArchiveSchema = z.object({
    id: z.string().nonempty({message:"Archive Id Cannot be empty"}),
    createdById:z.string().nonempty({message:"Created by User Cannot be left Empty"}),
    archiveId: z.string().nonempty({message:"Archive Asset Cannot be left empty"}),
    year:z.string().datetime().nonempty({message:" Year Cannot be left empty"})
})

export  type updateArchiveSchemaInput = z.infer<typeof updateArchiveSchema>