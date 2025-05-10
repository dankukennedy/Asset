import {z} from 'zod'

export const createSystemAuditSchema = z.object({
    status: z.string().min(3,{message:"Remarks Status cannot be less than 3 character"}).max(8,{message:""}).nonempty(),
    remarks: z.string().min(3,{message:"Remarks Characters cannot be less than 3 character"}).nonempty(),
    auditId: z.string().nonempty({message:"Audit Id cannot be empty"}),
    createdById: z.string().nonempty({message:"Created User will not be empty"})
})
export type createSystemAuditSchemaInput = z.infer<typeof createSystemAuditSchema>

export const updateSystemAuditSchema = z.object({
    id: z.string().nonempty({message:"System Audit  Id Cannot be left empty"}),
    status: z.string().min(3,{message:"Remarks Status cannot be less than 3 character"}).max(8,{message:""}).nonempty(),
    remarks: z.string().min(3,{message:"Remarks Characters cannot be less than 3 character"}).nonempty(),
    auditId: z.string().nonempty({message:"Audit Id cannot be empty"}),
    createdById: z.string().nonempty({message:"Created User will not be empty"})
})
export type updateSystemAuditSchemaInput = z.infer<typeof updateSystemAuditSchema>

export const findSystemAuditSchema = z.object({
   id: z.string().nonempty({message:"System Audit  Id Cannot be left empty"})
})
export type findSystemAuditSchemaInput = z.infer<typeof findSystemAuditSchema>