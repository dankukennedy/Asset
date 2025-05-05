import prisma from '../catalyst/prisma';
import { assetDataSchemaInput } from '../model/assetDataTypes';
import { Asset } from '@prisma/client';

export const createAsset = async(input: assetDataSchemaInput): Promise<{ success: boolean; message: string; parsedAsset: Asset }> => {
   try {
       const serial = await prisma.asset.findFirst({
           where: { serialNo: input.serialNo }
       })

       if(serial) throw new Error('Serial Number existed with an asset all ready');

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
      console.error('Error fetching assets:', error);
      throw new Error('Failed to retrieve assets');
    }
  };