import { Request,Response, NextFunction } from "express";
import { assetDataSchema, assetDataSchemaInput, assetUpdateDataSchema, findAssetDataSchema } from "../model/assetDataTypes"
import { allAssets, createAsset, deleteAssetById, findAssetById, updateAssetById } from "../services/assetService";
import { Prisma } from '@prisma/client'
import { ZodError ,z} from 'zod'

type Asset = Prisma.AssetGetPayload<{}>


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



export const createAssetHandler = async(req:Request, res:Response<ApiResponse<Asset>>, next:NextFunction) =>{
 try {
    const validate = assetDataSchema.parse(req.body);
    const result  = await createAsset(validate);
    if (!result.success) {
        const statusCode = result.message.includes('found') ? 404 : 400;
        return res.status(statusCode).json({success:result.success, message:result.message  });
      }
    res.status(201).json({success:result.success, message:result.message, data:result.parsedAsset})
 } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        return res.status(400).json({success:false, message:'creating Asset validation Fail', errors: errorMessages});
    }
    if(error instanceof Error){
      return  res.status(400).json({success:false, message:error.message});
    }
    next(error);
  }
}

export const allAssetsHandler = async(req:Request, res:Response<ApiResponse<Asset[]>>, next:NextFunction) =>{
    try {
        const result = await allAssets();
        if (!result.parsedAssets?.length) {
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message });
          }
          return res.status(200).json({success:result.success, message:result.message, data:result.parsedAssets});
       } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field: err.path.join('.'),
                message:err.message
            }));
            return res.status(400).json({success:false, message:'Fetching All Asset Failed', errors:errorMessages});
        }
         if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});
         }
         next(error);
    }
}

export const findAssetByIdHandler = async(req:Request, res:Response<ApiResponse<Asset>>, next:NextFunction) =>{
     try {
        const validate =  findAssetDataSchema.parse(req.body)
        const result = await findAssetById( validate);
        if (!result.success) {
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success: true, message:result.message  });
          }
        res.status(200).json({success:result.success, message:result.message, data:result.parsedAsset});
     } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field: err.path.join('.'),
                message:err.message
            }));
            return res.status(400).json({success:false, message:'Cannot find Asset an Asset ', errors:errorMessages});
        }
         if(error instanceof Error){
            return  res.status(400).json({success:false, message:error.message});

         }
         next(error);
     }
}

export const deleteAssetByIdHandler = async(req:Request, res:Response<ApiResponse<Asset>>, next:NextFunction) =>{
    try {
         const validate = findAssetDataSchema.parse(req.body);
         const result = await deleteAssetById(validate)
         if (!result.success) {
            const statusCode = result.message.includes('found') ? 404 : 400;
            return res.status(statusCode).json({success:result.success, message:result.message });
          }
        res.status(200).json({success:result.success, message:result.message, data:result.deletedAsset});
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field: err.path.join('.'),
                message:err.message
            }));
            return res.status(400).json({success:false, message:'Cannot delete an Asset ', errors:errorMessages});
        }
         if(error instanceof Error){
            return res.status(400).json({success:false, message:error.message});
         }
         next(error);
    }
}

export const updateAssetByIdHandler =  async(req:Request, res:Response<ApiResponse<Asset>>, next:NextFunction) =>{
    try {
    const validate = assetUpdateDataSchema.parse(req.body);
    const result = await updateAssetById(validate);
    if (!result.success) {
      const statusCode = result.message.includes('found') ? 404 : 400;
      return res.status(statusCode).json({success:result.success ,message: result.message });
    }
    return res.status(201).json({ success: true, message: result.message, data: result.updatedAsset });
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field: err.path.join('.'),
                message:err.message
            }));
          return  res.status(400).json({success:false, message:'Cannot update an Asset ', errors:errorMessages});

        }
         if(error instanceof Error){
           return res.status(400).json({success:false, message:error.message});
         }
         next(error);
    }
}