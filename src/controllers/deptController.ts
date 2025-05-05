import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError} from 'zod'
import { deptSchema, findDeptIdSchema, updateDeptSchema } from "../model/deptDataTypes";
import { allDepartment, createDepartment, findDepartmentById, updateDepartment } from "../services/deptService";

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
      if(!result){
        res.status(200).json({success:false, message:'Department cannot be created' });
      }
      res.status(201).json({success:result.success, message:result.message, data:result.department})
  } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        res.status(400).json({success:false, message:'creating Department validation Fail', errors: errorMessages});
        return
    }
    if(error instanceof Error){
        res.status(400).json({success:false, message:error.message});
        return
    }
    next(error);
  }
}

export const findDepartmentByIdHandler = async(req:Request, res:Response<ApiResponse<Department>>, next:NextFunction) =>{
    try {
           const validate = findDeptIdSchema.parse(req.body);
           const result =  await findDepartmentById(validate);
           if(!result){
             res.status(200).json({success:false, message:'cannot find department with an id'})
           }
           res.status(200).json({success:result.success, message:result.message, data:result.department})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            res.status(400).json({success:false, message:'finding Department validation Fail', errors: errorMessages});
            return
        }
        if(error instanceof Error){
            res.status(400).json({success:false, message:error.message});
            return
        }
        next(error);
    }
}

export const allDepartmentHandler = async(req:Request, res:Response<ApiResponse<Department[]>>, next:NextFunction) =>{
    try {
         const result  = await allDepartment()
         if(!result){
            res.status(200).json({success:false, message:'cannot get all department', })
         }
         res.status(200).json({success:result.success, message:result.message, data:result.departments})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            res.status(400).json({success:false, message:'finding all Department validation Fail', errors: errorMessages});
            return
        }
        if(error instanceof Error){
            res.status(400).json({success:false, message:error.message});
            return
        }
        next(error);

    }
}

export const updateDepartmentHandler = async(req:Request, res:Response<ApiResponse<Department>>, next:NextFunction) =>{
    try {
      const validate =updateDeptSchema.parse(req.body);
      const result  =  await updateDepartment(validate);
      if(!result){
        res.status(200).json({success:false, message:'cannot update department data'})
      }
      res.status(201).json({success:result.success, message:result.message, data:result.department})
    } catch (error) {
      if(error instanceof ZodError){
          const errorMessages = error.errors.map(err =>({
              field: err.path.join('.'),
              message: err.message
          }))
          res.status(400).json({success:false, message:'update Department validation Fail', errors: errorMessages});
          return
      }
      if(error instanceof Error){
          res.status(400).json({success:false, message:error.message});
          return
      }
      next(error);
    }
 }