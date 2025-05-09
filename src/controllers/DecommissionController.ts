import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { AllDeco, createDeco, deleteAllDeco, deleteDeco, fineDeco, updateDeco } from "../services/decommissionServices";
import { createDecoSchema, findDecoSchema, updateDecoSchema } from "../model/decommissionDataTypes";

type Decommission = Prisma.DecommissionGetPayload<{}>


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


export const createDecoHandler = async(req:Request, res:Response<ApiResponse<Decommission>>, next:NextFunction) =>{
    try {
        const validate = createDecoSchema.parse(req.body);
        const result =  await createDeco(validate);
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.deco})
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

export const fineDecoHandler = async(req:Request, res:Response<ApiResponse<Decommission>>, next:NextFunction) =>{
    try {
        const validate =  findDecoSchema.parse(req.body);
        const result =  await fineDeco(validate);
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.deco})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Finding Decommission validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const AllDecoHandler = async(req:Request, res:Response<ApiResponse<Decommission[]>>, next:NextFunction) =>{
    try {

        const result =  await AllDeco();
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.deco})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'All Decommission validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const deleteDecoHandler = async(req:Request, res:Response<ApiResponse<Decommission>>, next:NextFunction) =>{
    try {
        const validate =  findDecoSchema.parse(req.body);
        const result =  await deleteDeco(validate);
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.deco})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Deleting Decommission validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const deleteAllDecoHandler = async(req:Request, res:Response<ApiResponse<Decommission[]>>, next:NextFunction) =>{
    try {

        const result =  await deleteAllDeco();
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.deco})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Deleting All Decommission validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const updateDecoHandler = async(req:Request, res:Response<ApiResponse<Decommission>>, next:NextFunction) =>{
    try {
        const validate =  updateDecoSchema.parse(req.body);
        const result =  await updateDeco(validate);
        if(!result.message){
         const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return res.status(200).json({success:result.success, message:result.message, data:result.deco})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'Updating Decommission validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}