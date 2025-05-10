import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { createArchiveSchema, findArchiveSchema, updateArchiveSchema } from "../model/archiveDataTypes";
import { allArchive, createArchive, deleteAllArchive, deleteArchive, findArchive, updateArchive } from "../services/archiveService";



type Archive = Prisma.ArchiveGetPayload<{}>


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


export const createArchiveHandler =  async(req:Request, res:Response<ApiResponse<Archive>>, next:NextFunction) =>{
    try {
       const validate = createArchiveSchema.parse(req.body);
       const result  = await  createArchive(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.archive})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'creating Archive validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const findArchiveHandler =  async(req:Request, res:Response<ApiResponse<Archive>>, next:NextFunction) =>{
    try {
       const validate = findArchiveSchema.parse(req.body);
       const result  = await findArchive(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.archive})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Finding Archive validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const allArchiveHandler =  async(req:Request, res:Response<ApiResponse<Archive[]>>, next:NextFunction) =>{
    try {

       const result  = await  allArchive();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.archive})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'All Archive validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const updateArchiveHandler =  async(req:Request, res:Response<ApiResponse<Archive>>, next:NextFunction) =>{
    try {
       const validate = updateArchiveSchema.parse(req.body);
       const result  = await  updateArchive(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.archive})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Updating Archive validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const deleteArchiveHandler =  async(req:Request, res:Response<ApiResponse<Archive>>, next:NextFunction) =>{
    try {
       const validate = findArchiveSchema.parse(req.body);
       const result  = await  deleteArchive(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.archive})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Deleting Archive validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const deleteAllArchiveHandler =  async(req:Request, res:Response<ApiResponse<Archive[]>>, next:NextFunction) =>{
    try {
       
       const result  = await  deleteAllArchive();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.archive})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Deleting All Archive validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }
