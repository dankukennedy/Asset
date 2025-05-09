import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { allSystemAudit, createSystemAudit, deleteAllSystemAudit, deleteSystemAudit, findSystemAudit } from '../services/systemAuditService';
import { createSystemAuditSchema, findSystemAuditSchema } from '../model/systemAuditDataTypes';

type SystemAudit = Prisma.SystemAuditGetPayload<{}>


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



 export const createSystemAuditHandler = async(req:Request, res:Response<ApiResponse<SystemAudit>>, next:NextFunction) =>{
      try {

        const validate = createSystemAuditSchema.parse(req.body);
        const result  = await  createSystemAudit(validate);
        if(!result.success){
          const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return  res.status(201).json({success:result.success, message:result.message, data:result.systemAudit})

      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Create System Audit validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
      }
 }
 export const findSystemAuditHandler = async(req:Request, res:Response<ApiResponse<SystemAudit>>, next:NextFunction) =>{
      try {
         
        const validate = findSystemAuditSchema.parse(req.body);
        const result  = await  findSystemAudit(validate);
        if(!result.success){
          const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return  res.status(201).json({success:result.success, message:result.message, data:result.systemAudit})

      } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Create System Audit validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
      }
 }


 export const updateSystemAuditHandler = async(req:Request, res:Response<ApiResponse<SystemAudit>>, next:NextFunction) =>{
     try {
 
        const validate = createSystemAuditSchema.parse(req.body);
        const result  = await  createSystemAudit(validate);
        if(!result.success){
          const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return  res.status(201).json({success:result.success, message:result.message, data:result.systemAudit})

     } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Create System Audit validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
     }
 }
 export const allSystemAuditHandler =  async(req:Request, res:Response<ApiResponse<SystemAudit[]>>, next:NextFunction) =>{
    try {

        const result  = await  allSystemAudit();
        if(!result.success){
          const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return  res.status(201).json({success:result.success, message:result.message, data:result.systemAudit})

    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Create System Audit validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
 }
 export const deleteSystemAuditHandler  = async(req:Request, res:Response<ApiResponse<SystemAudit>>, next:NextFunction) =>{
    try {

        const validate = findSystemAuditSchema.parse(req.body);
        const result  = await  deleteSystemAudit(validate);
        if(!result.success){
          const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return  res.status(201).json({success:result.success, message:result.message, data:result.systemAudit})

    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Delete System Audit validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
 }
 export const deleteAllSystemAuditHandler  =  async(req:Request, res:Response<ApiResponse<SystemAudit[]>>, next:NextFunction) =>{
    try {

        const result  = await  deleteAllSystemAudit();
        if(!result.success){
          const statusCode = result.message.includes('found') ? 404 : 400;
          return res.status(statusCode).json({success:result.success, message:result.message})
        }
       return  res.status(201).json({success:result.success, message:result.message, data:result.systemAudit})

    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Delete All System Audit validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
 }
