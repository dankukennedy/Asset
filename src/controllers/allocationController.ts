import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { createAllocationSchema, findAllocationSchema, updateAllocationSchema } from "../model/allocationDataTypes";
import { createAllocation, deleteAllAllocation, deleteAllocation, findAllAllocation, findAllocation, updateAllocation } from "../services/allocationService";

type Allocation = Prisma.AllocationGetPayload<{}>


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


export const createAllocationHandler =  async(req:Request, res:Response<ApiResponse<Allocation>>, next:NextFunction) =>{
    try {
       const validate = createAllocationSchema.parse(req.body);
       const result  = await  createAllocation(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.allocation})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'creating Allocation validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

 
export const findAllocationHandler =  async(req:Request, res:Response<ApiResponse<Allocation>>, next:NextFunction) =>{
    try {
       const validate = findAllocationSchema.parse(req.body);
       const result  = await  findAllocation(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.allocation})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'creating Allocation validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const findAllAllocationHandler =  async(req:Request, res:Response<ApiResponse<Allocation[]>>, next:NextFunction) =>{
    try {
       const result  = await  findAllAllocation();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.allocation})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Find Allocation validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const updateAllocationHandler =  async(req:Request, res:Response<ApiResponse<Allocation>>, next:NextFunction) =>{
    try {
       const validate = updateAllocationSchema.parse(req.body);
       const result  = await  updateAllocation(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.allocation})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Update Allocation validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const deleteAllocationHandler =  async(req:Request, res:Response<ApiResponse<Allocation>>, next:NextFunction) =>{
    try {
       const validate = findAllocationSchema.parse(req.body);
       const result  = await  deleteAllocation(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.allocation})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Delete Allocation validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const deleteAllAllocationHandler =  async(req:Request, res:Response<ApiResponse<Allocation[]>>, next:NextFunction) =>{
    try {

       const result  = await  deleteAllAllocation();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.allocation})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Delete All Allocation validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }


