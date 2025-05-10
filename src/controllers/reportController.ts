import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { createReportSchema, findReportSchema, updateReportSchema } from "../model/reportDataTypes";
import { allReport, createReport, deleteAllReport, deleteReport, findReport, updateReport } from "../services/reportService";

type Report = Prisma.ReportGetPayload<{}>


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


export const createReportHandler =  async(req:Request, res:Response<ApiResponse<Report>>, next:NextFunction) =>{
    try {
       const validate = createReportSchema.parse(req.body);
       const result  = await  createReport(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.report})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'creating Report validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const findReportHandler =  async(req:Request, res:Response<ApiResponse<Report>>, next:NextFunction) =>{
    try {
       const validate = findReportSchema.parse(req.body);
       const result  = await  findReport(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.report})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Finding Report validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const allReportHandler =  async(req:Request, res:Response<ApiResponse<Report[]>>, next:NextFunction) =>{
    try {

       const result  = await  allReport();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.report})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'All Report validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const updateReportHandler =  async(req:Request, res:Response<ApiResponse<Report>>, next:NextFunction) =>{
    try {
       const validate = updateReportSchema.parse(req.body);
       const result  = await  updateReport(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.report})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Updating Report validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const deleteReportHandler =  async(req:Request, res:Response<ApiResponse<Report>>, next:NextFunction) =>{
    try {
       const validate = findReportSchema.parse(req.body);
       const result  = await  deleteReport(validate);
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.report})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Deleting Report validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }

export const deleteAllReportHandler=  async(req:Request, res:Response<ApiResponse<Report[]>>, next:NextFunction) =>{
    try {

       const result  = await  deleteAllReport();
       if(!result.success){
         const statusCode = result.message.includes('found') ? 404 : 400;
         return res.status(statusCode).json({success:result.success, message:result.message})
       }
      return  res.status(201).json({success:result.success, message:result.message, data:result.report})
  } catch (error) {
     if(error instanceof ZodError){
         const errorMessages = error.errors.map(err =>({
             field: err.path.join('.'),
             message: err.message
         }))
         return  res.status(400).json({success:false, message:'Deleting All Report validation Fail', errors: errorMessages});
     }
     if(error instanceof Error){
         return  res.status(400).json({success:false, message:error.message});
     }
     next(error);
    }
 }
