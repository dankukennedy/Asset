import { unknown } from 'zod';
import prisma from '../catalyst/prisma';
import { assetDataSchemaInput, assetUpdateDataSchemaInput, findAssetDataSchemaInput } from '../model/assetDataTypes';
import { Asset } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export const createAsset = async(input: assetDataSchemaInput): Promise<{ success: boolean; message: string; parsedAsset?: Asset }> => {
   try {
       const serial = await prisma.asset.findFirst({
           where: { serialNo: input.serialNo }
       })
       if(serial) {
         return {success:false, message:'Serial Number existed with an asset all ready'}
       };

       const embossCode = await prisma.asset.findFirst({
        where:{embossCode:input.embossCode}
       })
       if(embossCode){
        return {success:false, message:'embossCode existed with an asset all ready'}
       }


       const newAsset = await prisma.asset.create({
         data: {
           ...input,
           details: input.details ? JSON.stringify(input.details) : undefined
         }
       })
        // Parse JSON details if they exist
        const parsedAsset = {
          ...newAsset,
          details: newAsset.details ? JSON.parse(newAsset.details as string) : null,
        };
       return {success:true, message:'Asset created successfully', parsedAsset}

   } catch (error) {
     console.log('Asset cannot be created');
    throw error
   }
}

export const allAssets = async (): Promise<{success: boolean; message: string; parsedAssets: Asset[];}> => {
    try {
      const allAsset = await prisma.asset.findMany({
        orderBy: { createdAt: 'desc' }, // Optional: Sort by latest first
      });

      if (allAsset.length === 0) {
        return { success: true, message: 'No assets found', parsedAssets: [] };
      }

      // Parse JSON details if they exist
      const parsedAssets = allAsset.map(asset => ({
        ...asset,
        details: asset.details ? JSON.parse(asset.details as string) : null,
      }));

      return {success: true,message: 'Assets retrieved successfully',  parsedAssets,};
    } catch (error) {
      throw error
    }
  };

  export const findAssetById = async(input:findAssetDataSchemaInput):Promise<{ success: boolean; message: string;  parsedAsset?: Asset & { details: JsonValue | null };}> => {
    try {
      const asset = await prisma.asset.findUnique({
        where: { id: input.id },
      });

      if (!asset) {
        return { success: false, message: 'No assets found with specified id'  };
      }

      let parsedDetails: unknown = null;
      if (asset.details) {
        try {
          parsedDetails = JSON.parse(asset.details as string);
        } catch (parseError) {
          console.error('Failed to parse asset details:', parseError);
          parsedDetails = { error: 'Invalid JSON format in details' };
        }
      }
        const parsedAsset = { ...asset, details: parsedDetails  as JsonValue  };

        return {success: true, message: 'Asset retrieved successfully', parsedAsset };
    } catch (error) {
      console.error('Error fetching asset:', error);
      throw  error;
    }
  };


  export const deleteAssetById  = async(input:findAssetDataSchemaInput): Promise<{ success: boolean; message: string; deletedAsset?:  Asset & { details: JsonValue | null }; }> => {
    try {
      // First verify the asset exists
      const existingAsset = await prisma.asset.findUnique({
        where: { id: input.id },
      });

      if (!existingAsset) {
        return { success: false, message: 'No asset found with the specified ID' };
      }

      
      let parsedDetails: unknown = null;
      if (existingAsset.details) {
        try {
          parsedDetails = JSON.parse(existingAsset.details as string);
        } catch (parseError) {
          console.error('Failed to parse asset details:', parseError);
          parsedDetails = { error: 'Invalid JSON format in details' };
        }
      }
      // Delete the asset
       await prisma.asset.delete({
        where: { id: existingAsset.id },
      });
      

      return { success: true, message: 'Asset deleted successfully', deletedAsset: { ...existingAsset,details: parsedDetails as JsonValue  }};
    } catch (error) {

      throw error;
    }
  };


  export const updateAssetById = async (input:assetUpdateDataSchemaInput): Promise<{ success: boolean; message: string;  updatedAsset?: Asset & { details: JsonValue | null };  }> => {
    try {
      // Verify the asset exists first
      const existingAsset = await prisma.asset.findUnique({
        where: { id: input.id },
      });
  
      if (!existingAsset) {
        return { success: false, message: 'No asset found with the specified ID'  };
      }
  
      // Check for duplicate serialNo if being updated
      if (input.serialNo && input.serialNo !== input.serialNo) {
        const duplicate = await prisma.asset.findFirst({
          where: { 
            serialNo: input.serialNo,
            NOT: { id: input.id }
          },
        });
        if (duplicate) {
          return {  success: false,  message: 'Another asset already uses this serial number'   };
        }
      }
  
      const updatedAsset = await prisma.asset.update({
        where: { id: input.id },
        data: {
          ...(input.name && { name: input.name }),
          ...(input.category && { category: input.category }),
          ...(input.serialNo && { serialNo: input.serialNo }),
          ...(input.subType && { subType: input.subType }),
          ...(input.type && { type: input.type }),
          ...(input.model && { model: input.model }),
          ...(input.embossCode && { embossCode: input.embossCode }),
          ...(input.category && { category: input.category }),
          // include other fields similarly
          ...(input.details && { details: JSON.stringify(input.details) }),
          updatedAt: new Date(), // This is always updated
        },
      });
  
      // Parse details back to object
      let parsedDetails: JsonValue | null = null;
      if (updatedAsset.details) {
        try {
          parsedDetails = JSON.parse(updatedAsset.details as string) as JsonValue;
        } catch (parseError) {
          console.error('Failed to parse asset details:', parseError);
          parsedDetails = { error: 'Invalid JSON format in details' };
        }
      }
  
      return {
        success: true,
        message: 'Asset updated successfully',
        updatedAsset: {
          ...updatedAsset,
          details: parsedDetails,
        },
      };
    } catch (error:unknown) {
      console.error('Error updating asset:', error);
      throw error;
    }
  };

  export const deleteAllAsset = async():Promise<{success: boolean; message: string; assets?: Asset[];}> => {
      try {
          const assets = await prisma.asset.findMany();
          if(!assets){
            return { success:false, message:'All Assets Not Deleted'}
          }
          if(assets.length === 0){
            return { success:false, message:'No Assets to be Deleted'}
          }

          await prisma.asset.deleteMany();
          return { success:true, message:"All Assets Deleted Successfully", assets:[]}
      } catch (error:unknown) {
        throw error;
      }
  }