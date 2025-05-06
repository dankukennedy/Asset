import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { deptSchema, findDeptIdSchema, updateDeptSchema } from "../model/deptDataTypes";
import { allDepartment, createDepartment, deleteAllDepartment, deleteDepartment, findDepartmentById, updateDepartment } from "../services/deptService";

type Department = Prisma.DepartmentGetPayload<{}>


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




export const createDepartmentHandler = async(req:Request, res:Response<ApiResponse<Department>>, next:NextFunction) =>{
  try {
      const validate =  deptSchema.parse(req.body);
      const result  = await createDepartment(validate);
      if(!result.success){
        const statusCode = result.message.includes('found') ? 404 : 400;
       return res.status(statusCode).json({success:result.success, message:result.message});
      }
     return res.status(201).json({success:result.success, message:result.message, data:result.department})
  } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
       return  res.status(400).json({success:false, message:'creating Department validation Fail', errors: errorMessages});

    }
    if(error instanceof Error){
      return  res.status(400).json({success:false, message:error.message});
    }
    next(error);
  }
}

export const findDepartmentByIdHandler = async(req:Request, res:Response<ApiResponse<Department>>, next:NextFunction) =>{
    try {
           const validate = findDeptIdSchema.parse(req.body);
           const result =  await findDepartmentById(validate);
           if(!result.message){
            const statusCode = result.message.includes('found') ? 404 : 400;
             return res.status(statusCode).json({success:result.success, message:result.message})
           }
          return res.status(200).json({success:result.success, message:result.message, data:result.department})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'finding Department validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const allDepartmentHandler = async(req:Request, res:Response<ApiResponse<Department[]>>, next:NextFunction) =>{
    try {
         const result  = await allDepartment()
         if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
           return res.status(statusCode).json({success:result.success, message:result.message })
         }
        return res.status(200).json({success:result.success, message:result.message, data:result.departments})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
           return res.status(400).json({success:false, message:'finding all Department validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
          return  res.status(400).json({success:false, message:error.message});
        }
        next(error);

    }
}

export const updateDepartmentHandler = async(req:Request, res:Response<ApiResponse<Department>>, next:NextFunction) =>{
    try {
      const validate =updateDeptSchema.parse(req.body);
      const result  =  await updateDepartment(validate);
      if(!result.success){
        const statusCode = result.message.includes('found') ? 404 : 400;
        return res.status(statusCode).json({success:result.success, message:result.message})
      }
     return  res.status(201).json({success:result.success, message:result.message, data:result.department})
    } catch (error) {
      if(error instanceof ZodError){
          const errorMessages = error.errors.map(err =>({
              field: err.path.join('.'),
              message: err.message
          }))
          return res.status(400).json({success:false, message:'update Department validation Fail', errors: errorMessages});
      }
      if(error instanceof Error){
         return res.status(400).json({success:false, message:error.message});
      }
      next(error);
    }
 }


export const deleteDepartmentHandler = async(req:Request, res:Response<ApiResponse<Department>>, next:NextFunction) =>{
  try {
    const validate = findDeptIdSchema.parse(req.body);
      const result = await deleteDepartment(validate);
    if(!result.success){
        const statusCode = result.message.includes('found') ? 404 : 400;
        return res.status(statusCode).json({success:result.success, message:result.message})
      }
     return  res.status(201).json({success:result.success, message:result.message, data:result.department})
  } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        return res.status(400).json({success:false, message:'delete Department validation Fail', errors: errorMessages});
    }
    if(error instanceof Error){
       return res.status(400).json({success:false, message:error.message});
    }
    next(error);
  }
}

export const deleteAllDepartmentHandler = async(req:Request, res:Response<ApiResponse<Department[]>>, next:NextFunction) =>{
    try {
        const result = await deleteAllDepartment()
        if(!result.success){
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message})
          }
         return  res.status(201).json({success:result.success, message:result.message, data:result.departments})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return res.status(400).json({success:false, message:'delete Department validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}