import prisma from '../catalyst/prisma';
import { assetDataSchemaInput } from '../model/assetDataTypes';

export const createAsset = async(input:assetDataSchemaInput) =>{
   try {
       const serial = await prisma.asset.findFirst({
        where:{serialNo:input.serialNo}
       })

       if(serial) throw new Error('Serial Number existed with an asset all ready');

       const newAsset = await prisma.asset.create({
         data: {
           ...input,
           details: input.details ? JSON.stringify(input.details) : undefined
         }
       })

       return {success:true, message:'Asset created successfully', newAsset}

   } catch (error) {
     console.log('Asset cannot be created');
    throw error
   }
}

export const allAssets = async () => {
    try {
      const allAsset = await prisma.asset.findMany({
        orderBy: { createdAt: 'desc' }, // Optional: Sort by latest first
      });
  
      if (allAsset.length === 0) {
        return { success: true, message: 'No assets found', data: [] };
      }
  
      // Parse JSON details if they exist
      const parsedAssets = allAsset.map(asset => ({
        ...asset,
        details: asset.details ? JSON.parse(asset.details as string) : null,
      }));
  
      return {success: true,message: 'Assets retrieved successfully',  data:parsedAssets,};
    } catch (error) {
      console.error('Error fetching assets:', error);
      throw new Error('Failed to retrieve assets');
    }
  };