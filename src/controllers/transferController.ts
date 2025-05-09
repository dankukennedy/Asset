import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { createTransferSchema, findTransferSchema, updateTransferSchema } from "../model/transferDataTypes";
import { allTransfers, createTransfer, deleteAllTransfers, deleteTransfer, findTransfer, updateTransfer } from "../services/transferService";

type Transfer = Prisma.TransferGetPayload<{}>


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



export const createTransferHandler = async(req:Request, res:Response<ApiResponse<Transfer>>, next:NextFunction) =>{
    try {
        const validate = createTransferSchema.parse(req.body);
       const result  = await  createTransfer(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.transfer})

    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Create Transfer validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}


export const findTransferHandler = async(req:Request, res:Response<ApiResponse<Transfer>>, next:NextFunction) =>{
    try {
        const validate = findTransferSchema.parse(req.body);
       const result  = await  findTransfer(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.transfer})
 
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Creating Transfer Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}


export const updateTransferHandler =async(req:Request, res:Response<ApiResponse<Transfer>>, next:NextFunction) =>{
    try {
        const validate = updateTransferSchema.parse(req.body);
       const result  = await  updateTransfer(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.transfer})
 
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Update Transfer validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}


export const deleteTransferHandler =async(req:Request, res:Response<ApiResponse<Transfer>>, next:NextFunction) =>{
    try {
        const validate = findTransferSchema.parse(req.body);
       const result  = await  deleteTransfer(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.transfer})
 
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Delete Transfer validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}


export const allTransfersHandler =async(req:Request, res:Response<ApiResponse<Transfer[]>>, next:NextFunction) =>{
    try {
       
       const result  = await allTransfers();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.transfer})
 
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Find all Transfers validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}


export const deleteAllTransfersHandler =async(req:Request, res:Response<ApiResponse<Transfer[]>>, next:NextFunction) =>{
    try {

       const result  = await  deleteAllTransfers();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.transfer})
 
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Delete All Transfer validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}