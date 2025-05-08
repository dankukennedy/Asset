import { Request,Response, NextFunction } from "express";
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
import { assetUserSchema, findAssetUserSchema, updateAssetUserSchema } from "../model/assetUserDataTypes";
import { createAssetUser, deleteAllAssetUser, deleteAssetUser, findAllAssetUser, findAssetUser, updateAssetUser } from "../services/assetUserServices";


type AssetUser = Prisma.AssetUserGetPayload<{}>


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

export const createAssetUserHandler = async(req:Request, res:Response<ApiResponse<AssetUser>>, next:NextFunction) =>{
    try {
         const validate = assetUserSchema.parse(req.body);
         const result = await createAssetUser(validate)
        if (!result.success) {
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message  });
          }
        res.status(201).json({success:result.success, message:result.message, data:result.assetUser})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'creating Asset user validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const  deleteAssetUserHandler = async(req:Request, res:Response<ApiResponse<AssetUser>>, next:NextFunction) =>{
    try {
         const validate = findAssetUserSchema.parse(req.body);
         const result = await  deleteAssetUser(validate)
        if (!result.success) {
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message  });
          }
        res.status(201).json({success:result.success, message:result.message, data:result.assetUser})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Delete Asset user validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const deleteAllAssetUserHandler = async(req:Request, res:Response<ApiResponse<AssetUser[]>>, next:NextFunction) =>{
    try {

         const result = await deleteAllAssetUser()
        if (!result.success) {
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message  });
          }
        res.status(201).json({success:result.success, message:result.message, data:result.assetUser})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Delete Asset user validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const findAssetUserHandler = async(req:Request, res:Response<ApiResponse<AssetUser>>, next:NextFunction) =>{
    try {
         const validate = findAssetUserSchema.parse(req.body);
         const result = await  findAssetUser(validate)
        if (!result.success) {
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message  });
          }
        res.status(201).json({success:result.success, message:result.message, data:result.assetUser})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'Find Asset user validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }
}

export const findAllAssetUserHandler = async(req:Request, res:Response<ApiResponse<AssetUser[]>>, next:NextFunction) =>{
    try {
        const result = await findAllAssetUser()
        if (!result.success) {
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message  });
          }
        res.status(201).json({success:result.success, message:result.message, data:result.assetUser})
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err =>({
                field: err.path.join('.'),
                message: err.message
            }))
            return  res.status(400).json({success:false, message:'All Asset user validation Fail', errors: errorMessages});
        }
        if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
        }
        next(error);
    }

}

export  const updateAssetUserHandler = async(req:Request, res:Response<ApiResponse<AssetUser>>, next:NextFunction) =>{

    try {
          const validate =  updateAssetUserSchema.parse(req.body)
          const result = await updateAssetUser(validate)
       if (!result.success) {
           const statusCode = result.message.includes('found') ? 404 : 400;
           return res.status(statusCode).json({success:result.success, message:result.message  });
         }
       res.status(201).json({success:result.success, message:result.message, data:result.assetUser})
    } catch (error) {
     if(error instanceof ZodError){
       const errorMessages = error.errors.map(err=>({
           field: err.path.join('.'),
           message:err.message
       }));
     return  res.status(400).json({success:false, message:'Cannot update an Asset user ', errors:errorMessages});
 
   }
    if(error instanceof Error){
      return res.status(400).json({success:false, message:error.message});
    }
    next(error);
    }
 }