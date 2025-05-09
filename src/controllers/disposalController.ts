import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { createDisposalSchema, findDisposalSchema, updateDisposalSchema } from "../model/disposalDataTypes";
import { allDisposal, createDisposal, deleteAllDisposal, deleteDisposal, findDisposal, updateDisposal } from "../services/disposalService";


type Disposal = Prisma.DisposalGetPayload<{}>


  type ApiResponse<T = any> = {
    success: boolean; 
     message: string; 
     data?: T;
    asset?: T | T[]; 
    errors?: Array<{
      field: string;
      message: string;
    }>;
};


export const createDisposalHandler = async(req:Request, res:Response<ApiResponse<Disposal>>, next:NextFunction) =>{
    try {
        const validate = createDisposalSchema.parse(req.body);
        const result =  await createDisposal(validate);
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.disposal})
    
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Creating Disposal Validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const findDisposalHandler = async(req:Request, res:Response<ApiResponse<Disposal>>, next:NextFunction) =>{
    try {
        const validate = findDisposalSchema.parse(req.body);
        const result =  await findDisposal(validate);
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.disposal})
    
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Finding Disposal Validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const allDisposalHandler = async(req:Request, res:Response<ApiResponse<Disposal[]>>, next:NextFunction) =>{
    try {

        const result =  await allDisposal();
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.disposal})
    
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'All Disposal Validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const updateDisposalHandler = async(req:Request, res:Response<ApiResponse<Disposal>>, next:NextFunction) =>{
    try {
        const validate = updateDisposalSchema.parse(req.body);
        const result =  await updateDisposal(validate);
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.disposal})
    
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Creating Decommission Validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const deleteDisposalHandler = async(req:Request, res:Response<ApiResponse<Disposal>>, next:NextFunction) =>{
    try {
        const validate = findDisposalSchema.parse(req.body);
        const result =  await deleteDisposal(validate);
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.disposal})
    
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Creating Decommission Validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}
export const deleteAllDisposalHandler  = async(req:Request, res:Response<ApiResponse<Disposal[]>>, next:NextFunction) =>{
    try {

        const result =  await deleteAllDisposal();
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.disposal})
    
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Delete All Validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

