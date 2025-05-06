 import {z} from 'zod'

 // Users Schema
 export const createUserSchema = z.object({
    email:z.string().min(11,{message:"email address cannot less than 11 characters"}).email({message:"please input email format"}).nonempty({message:"email cannot be left empty"}),
    fullname:z.string().min(2,{message:"name cannot be less than 2 characters"}).max(30,{message:"name cannot be more than 30 characters"}).nonempty({message:"name cannot be left empty"}),
    password:z.string().min(4,{message:"password cannot be less than 4 characters"}).max(30,{message:"password must not be more than 30 characters"}).nonempty({message:"password cannot be left empty"})
    .regex(/[A-Z]/,{message:"password must contain at least one uppercase"})
    .regex(/[a-z]/,{message:"password must contain at least one lowercase"})
    .regex(/[0-9]/,{message:"password must contain at least one number"})
    .regex(/[^A-Za-z0-9]/,{message:"password must contain one special character"}),
    username:z.string().min(4,{message:"username cannot be less than 4 characters"}).max(30,{message:"username must not be more than 30 characters"}).nonempty({message:" username cannot be left empty"}),
    contact:z.string().min(10,{message:"contact must not be less than 10 figures"}).max(13,{message:"contact cannot be more than 13 figures including 233"}).nonempty({message:"contact cannot be left empty"})
    .regex(/^[0-9]+$/, {message:"contact can only contain digits"}),
    department:z.string().nonempty({message:"department cannot be left empty"})
 })
 export type createUserSchemaInput = z.infer<typeof createUserSchema >

// Login Users Schema
 export const loginUserSchema = z.object({
    email:z.string().min(11,{message:"email address cannot less than 11 characters"}).email({message:"please input email format"}).nonempty({message:"email cannot be left empty"}),
    password:z.string().min(4,{message:"password cannot be less than 4 characters"}).max(30,{message:"password must not be more than 30 characters"}).nonempty({message:"password cannot be left empty"})
    .regex(/[A-Z]/,{message:"password must contain at least one uppercase"})
    .regex(/[a-z]/,{message:"password must contain at least one lowercase"})
    .regex(/[0-9]/,{message:"password must contain at least one number"})
    .regex(/[^A-Za-z0-9]/,{message:"password must contain one special character"}),
 })
 export type loginUserSchemaInput = z.infer<typeof loginUserSchema >

// Reset Password for Users Schema
export const resetPassUserSchema = z.object({
   token: z.string().nonempty({message:'token is required'}),
   password: z.string().min(4, {message:'Password must be at least 4 digits'}).max(30).nonempty({message:'Password is required'}),
});
export type resetPassUserSchemaInput = z.infer<typeof resetPassUserSchema>;

//Update User Password Schema
export const updateUserPasswordSchema = z.object({
   id: z.string().nonempty({message:'User id cannot be left empty'}),
   password: z.string().min(4, {message:'Password must be at least 4 digits'}).max(30).nonempty( {message:'Password is required'}),
   newPassword: z.string().min(4, {message:'Password must be at least 4 digits'}).max(30).nonempty( {message:'Password is required'}),
 })
 export type updateUserPasswordSchemaInput = z.infer<typeof updateUserPasswordSchema>

// Email for Users Schema
export const emailUserSchema = z.object({
   email: z.string().email({message:'invalid email'}).min(10, {message:'Email must be at least 10 characters'}).max(100).nonempty({message:'Email is required'})
 });
 export type emailUserSchemaInput = z.infer<typeof emailUserSchema>;

// Token for Users Schema
export const tokenUserSchema = z.object({
   token: z.string().nonempty({message:'token is required'}),
 });
 export type tokenUserSchemaInput = z.infer<typeof tokenUserSchema>;

 // Update User Schema
export const updateUserSchema = z.object({
   id: z.string().nonempty({message: 'User id cannot be left empty'}),
   pic: z.any().optional(),
   fullname:z.string().min(2,{message:"name cannot be less than 2 characters"}).max(30,{message:"name cannot be more than 30 characters"}).optional(),
   email: z.string()
     .email({message: 'Invalid email'})
     .min(10, {message: 'Email must be at least 10 characters'})
     .max(100)
     .optional(),
   contact: z.string()
     .min(10, {message: 'Contact must be 10 digits'})
     .max(13, {message: 'Contact must be 13 digits'})
     .regex(/^\d+$/, {message: 'Contact must contain only digits'}).optional(),
     role: z.string().min(5,{message:"role cannot be less than 4 characters"}).max(7).optional(),
     department:z.string().min(2,{message:'department must be more than two characters'}).max(100,{message:'must not be more than 100 characters'}).optional(),
 });
 export type UpdateUserSchemaInput = Omit<z.infer<typeof updateUserSchema>, 'pic'>

 export const findUserByIdSchema = z.object({
   id: z.string().nonempty({message:'User id cannot be left empty'}),
 })
 export type  findUserByIdSchemaInput = z.infer<typeof findUserByIdSchema>