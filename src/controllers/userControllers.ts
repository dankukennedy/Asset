import { Request, Response, NextFunction } from 'express'
import { User } from '@prisma/client'
import { ZodError } from 'zod'
import { createUserSchema } from '../model/userDataTypes';
import { createUser } from '../services/userServices';

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
       res.status(201).json({ success:result.success, message: result.message, data:result.user });
   } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        res.status(400).json({success: false,message: 'Validation failed',errors: errorMessages});
        return
       }
      if (error instanceof Error) {
         res.status(400).json({success: false,message: error.message});
        return;
      }
        next(error);
     }
  }