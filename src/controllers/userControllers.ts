import { Request, Response, NextFunction } from 'express'
import type { Prisma } from '@prisma/client'
type User = Prisma.UserGetPayload<{}>
import { ZodError } from 'zod'
import { createUserSchema, emailUserSchema, findUserByIdSchema, loginUserSchema, resetPassUserSchema, tokenUserSchema, updateUserSchema } from '../model/userDataTypes';
import { activateToken, allUsers, createUser, deleteAllUsers, deleteUserById, findUserById, loginUser, resetActivationToken, resetPassword, resetPasswordWithOTP, updateUser } from '../services/userServices';

// Define a type for the user data that will be returned (excluding sensitive fields)
type SafeUser = Omit<User, 'password' | 'token' | 'tokenExp'> & {
    token?: string;
  };

  type ApiResponse<T = SafeUser> = {
      success: boolean;  message: string;  data?: T;
      user?: T;  token?: string;
      errors?: Array<{
        field: string;
        message: string;
      }>;
  };

  //Handling user creation process

  export const createUserHandler = async(req:Request, res:Response<ApiResponse<User>>, next:NextFunction) => {
   try {
       const validate = createUserSchema.parse(req.body);
       const result = await createUser(validate);
       if(!result.success){
        const statusCode = result.message.includes('found') ? 404 : 400;
        return res.status(statusCode).json({success:result.success, message:result.message})
       }
       return res.status(201).json({ success:result.success, message: result.message, data:result.user });
   } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        return res.status(400).json({success: false,message: 'Create User Validation failed',errors: errorMessages})
       }
      if (error instanceof Error) {
        return  res.status(400).json({success: false,message: error.message});
      }
        next(error);
     }
  }

  export const loginUserHandler = async(req:Request, res:Response<ApiResponse>, next:NextFunction) => {
     try {
        const validate = loginUserSchema.parse(req.body);
        const result = await loginUser(validate);
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
           return res.status(statusCode).json({success:result.success, message:result.message})
        }
        return res.status(200).json({success:result.success,message:result.message,data:result.user,token:result.token });

     } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success: false,message: 'Login Validation failed',errors: errorMessages});
        } if (error instanceof Error) {
          return  res.status(400).json({success: false,message: error.message});
         }
           next(error);
     }

}


export const activateTokenHandler = async(req:Request, res:Response<ApiResponse<User>>, next:NextFunction) =>{
    try {
        const validate = tokenUserSchema.parse(req.body);
        const result = await activateToken(validate);
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(201).json({success:result.success, message:result.message, data:result.user})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success: false,message: 'Token Validation failed',errors: errorMessages});
        }if (error instanceof Error) {
           return res.status(400).json({success: false,message: error.message});
         }
           next(error);
    }
}


export const resetActivationTokenHandler = async(req:Request, res:Response<ApiResponse<User>>, next:NextFunction)  =>{
    try {
        const validate = emailUserSchema.parse(req.body);
        const result  = await resetActivationToken(validate);
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return  res.status(statusCode).json({success:result.success, message:result.message})
        }
        return res.status(201).json({success:result.success, message:result.message, data:result.user});
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                 field: err.path.join('.'),
                 message: err.message
            }))
            return res.status(400).json({success:false, message:'Reset Token Validation Failed',errors: errorMessages});
        } if(error instanceof Error){
            return  res.status(400).json({success: false,message: error.message});
        }
        next(error);
    }
}


export const resetPasswordWithOTPHandler = async(req:Request, res:Response<ApiResponse<User>>, next:NextFunction) =>{
    try {
        const validate = emailUserSchema.parse(req.body);
        const result =  await resetPasswordWithOTP(validate);
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return  res.status(statusCode).json({success:result.success, message:result.message})
        }
        return res.status(201).json({success:result.success, message:result.message, data:result.user});
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field: err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'Rest Password with Token validation Failed', errors: errorMessages});
        } if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}


export const  resetPasswordHandler = async(req:Request, res:Response<ApiResponse<User>>, next:NextFunction) =>{
    try {
        const validate = resetPassUserSchema.parse(req.body)
        const result = await resetPassword(validate)
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
        }
        return res.status(201).json({success:result.success, message:result.message, data:result.updateUser});
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field:err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'Password reset Validation Failed ', errors:errorMessages})

        }if(error instanceof Error){
            return  res.status(400).json({success:false,message:error.message});
        }
        next(error);
    }
}


export const updateUserHandler = async(req:Request, res:Response<ApiResponse<User>>, next:NextFunction) =>{
    try {
        const updateData = {...req.body, pic:req.file}
        const validate =  updateUserSchema.parse(updateData);
        const result = await updateUser(validate);
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
        }
        return res.status(201).json({success:true, message:result.message,data:result.user});

    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field:err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Password reset Validation Failed ', errors:errorMessages})
        }if(error instanceof Error){
            return   res.status(400).json({success:false,message:error.message});
        }
        next(error);
    }
}


export const deleteUserByIdHandler = async(req:Request, res:Response<ApiResponse<User>>, next:NextFunction) =>{
 try {
      const validate =  findUserByIdSchema.parse(req.body);
      const result = await deleteUserById(validate)
    if(!result.success){
        const statusCode = result.message.includes('found') ? 404 : 400;
        return res.status(statusCode).json({success:result.success, message:result.message})
    }
    return res.status(201).json({success:true, message:result.message,data:result.user});
 } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err=>({
            field:err.path.join('.'),
            message: err.message
        }))
        return  res.status(400).json({success:false, message:'Delete User Validation Failed ', errors:errorMessages})
    }if(error instanceof Error){
        return   res.status(400).json({success:false,message:error.message});
    }
    next(error);
 }

}


export const findUserByIdHandler = async(req:Request, res:Response<ApiResponse<User>>, next:NextFunction) =>{
    try {
             const validate = findUserByIdSchema.parse(req.body);
             const result = await findUserById(validate)
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
        }
        return res.status(201).json({success:true, message:result.message,data:result.user});
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field:err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Find User Validation Failed ', errors:errorMessages})
        }if(error instanceof Error){
            return   res.status(400).json({success:false,message:error.message});
        }
        next(error);
    }

}


export const allUsersHandler = async(req:Request, res:Response<ApiResponse<User[]>>, next:NextFunction) =>{
    try {
          const result = await allUsers()
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
        }
        return res.status(201).json({success:true, message:result.message,data:result.users});
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field:err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'all Users Validation Failed ', errors:errorMessages})
        }if(error instanceof Error){
            return   res.status(400).json({success:false,message:error.message});
        }
        next(error);
    }

}

export const deleteAllUsersHandler = async(req:Request, res:Response<ApiResponse<User[]>>, next:NextFunction) =>{
    try {
        const result  = await deleteAllUsers()
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
        }
        return res.status(201).json({success:true, message:result.message,data:result.users});
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field:err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Password reset Validation Failed ', errors:errorMessages})
        }if(error instanceof Error){
            return   res.status(400).json({success:false,message:error.message});
        }
        next(error);
    }
}
