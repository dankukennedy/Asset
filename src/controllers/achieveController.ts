import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { createAchieveSchema, findAchieveSchema, updateAchieveSchema } from "../model/achieveDataTypes";
import { allAchieve, createAchieve, deleteAchieve, deleteAllAchieve, findAchieve, updateAchieve } from "../services/achieveService";

type Achieve = Prisma.AchieveGetPayload<{}>


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


export const createAchieveHandler =  async(req:Request, res:Response<ApiResponse<Achieve>>, next:NextFunction) =>{
    try {
       const validate = createAchieveSchema.parse(req.body);
       const result  = await  createAchieve(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.achieve})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'creating Achieve validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const findAchieveHandler =  async(req:Request, res:Response<ApiResponse<Achieve>>, next:NextFunction) =>{
    try {
       const validate = findAchieveSchema.parse(req.body);
       const result  = await  findAchieve(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.achieve})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Finding Achieve validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const allAchieveHandler =  async(req:Request, res:Response<ApiResponse<Achieve[]>>, next:NextFunction) =>{
    try {

       const result  = await  allAchieve();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.achieve})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'All Achieve validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const updateAchieveHandler =  async(req:Request, res:Response<ApiResponse<Achieve>>, next:NextFunction) =>{
    try {
       const validate = updateAchieveSchema.parse(req.body);
       const result  = await  updateAchieve(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.achieve})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Updating Achieve validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const deleteAchieveHandler =  async(req:Request, res:Response<ApiResponse<Achieve>>, next:NextFunction) =>{
    try {
       const validate = findAchieveSchema.parse(req.body);
       const result  = await  deleteAchieve(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.achieve})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Deleting Achieve validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const deleteAllAchieveHandler =  async(req:Request, res:Response<ApiResponse<Achieve[]>>, next:NextFunction) =>{
    try {
       
       const result  = await  deleteAllAchieve();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.achieve})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Deleting All Achieve validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }
