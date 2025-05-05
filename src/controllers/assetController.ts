import { Request,Response, NextFunction } from "express";
import { assetDataSchema } from "../model/assetDataTypes"
import { allAssets, createAsset } from "../services/assetService";
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'

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
    if (!result) {
        return res.status(200).json({success: true, message: 'No assets found',data:result['']  });
      }
    res.status(201).json({success:result.success, message:result.message, data:result.parsedAsset})
 } catch (error) {
    if(error instanceof ZodError){
        const errorMessages = error.errors.map(err =>({
            field: err.path.join('.'),
            message: err.message
        }))
        res.status(400).json({success:false, message:'creating Asset validation Fail', errors: errorMessages});
        return
    }
    if(error instanceof Error){
        res.status(400).json({success:false, message:error.message});
        return
    }
    next(error);
  }
}

export const allAssetsHandler = async(req:Request, res:Response<ApiResponse<Asset[]>>, next:NextFunction) =>{
    try {
        const result = await allAssets();
        if (!result.parsedAssets?.length) {
            return res.status(200).json({success: true, message: 'No assets found',data: []  });
          }
        res.status(200).json({success:result.success, message:result.message, data:result.parsedAssets});
    } catch (error) {
        if(error instanceof ZodError){
            const errorMessages = error.errors.map(err=>({
                field: err.path.join('.'),
                message:err.message
            }));
            res.status(400).json({success:false, message:'Fetching All Asst Failed', errors:errorMessages});
            return;
        }
         if(error instanceof Error){
            res.status(400).json({success:false, message:error.message});
            return 
         }
         next(error);
    }
}