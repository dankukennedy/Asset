import {z} from 'zod'

export  const  createAchieveSchema = z.object({
    createdById:z.string().nonempty({message:"Created by User Cannot be left Empty"}),
    achieveId: z.string().nonempty({message:"Achieve Asset Cannot be left empty"}),
    year:z.string().datetime().nonempty({message:" Year Cannot be left empty"})
})
export  type createAchieveSchemaInput = z.infer<typeof createAchieveSchema>

export  const  findAchieveSchema = z.object({
    id: z.string().nonempty({message:"Achieve Id Cannot be empty"}),
})
export  type findAchieveSchemaInput = z.infer<typeof findAchieveSchema>

export  const  updateAchieveSchema = z.object({
    id: z.string().nonempty({message:"Achieve Id Cannot be empty"}),
    createdById:z.string().nonempty({message:"Created by User Cannot be left Empty"}),
    achieveId: z.string().nonempty({message:"Achieve Asset Cannot be left empty"}),
    year:z.string().datetime().nonempty({message:" Year Cannot be left empty"})
})

export  type updateAchieveSchemaInput = z.infer<typeof updateAchieveSchema>