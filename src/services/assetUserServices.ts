import prisma from '../catalyst/prisma';
import { assetUserSchemaInput, findAssetUserSchemaInput, updateAssetUserSchemaInput } from '../model/assetUserDataTypes';
import {AssetUser} from'@prisma/client'

export const createAssetUser = async(input:assetUserSchemaInput):Promise<{ success: boolean; message: string; assetUser?:AssetUser}>=>{
   try {
         const user = await prisma.assetUser.findUnique({
            where:{name:input.name}
         })
         if(user){
            return { success:false, message:'Name already existed in the database'}
         }
         const assetUser = await prisma.assetUser.create({
            data:{
                ...input
            }
         })
     return {success:true, message:'Asset user Created successfully',assetUser}
   } catch (error:unknown) {
      throw error
   }
}

export const findAssetUser = async(input:findAssetUserSchemaInput):Promise<{ success: boolean; message: string; assetUser?:AssetUser}>=>{
   try {
         const assetUser = await prisma.assetUser.findUnique({
            where:{id:input.id}
         })
         if(!assetUser){
            return { success:false, message:'no  Asset user with that it '}
         }

     return {success:true, message:'Asset user Created successfully',assetUser}
   } catch (error:unknown) {
      throw error
   }
}



export const findAllAssetUser = async():Promise<{ success: boolean; message: string; assetUser?:AssetUser[]}>=>{
   try {
         const assetUser = await prisma.assetUser.findMany({
            include:{
                userDepartment:true
            },
            orderBy: {
                name: 'asc'
             }
         })
         if(!assetUser.length){
            return { success:false, message:'No Asset user'}
         }
 
     return {success:true, message:'Find all Asset users  successfully',assetUser}
   } catch (error:unknown) {
      throw error
   }
}

export const deleteAllAssetUser = async():Promise<{ success: boolean; message: string; assetUser?:AssetUser[]}>=>{
   try {
         const assetUser = await prisma.assetUser.deleteMany()
         if(assetUser.count === 0 ){
            return { success:false, message:'No Asset user existed'}
         }
         if(!assetUser){
            return { success:false, message:'Name already existed '}
         }

     return {success:true, message:'Asset user Created successfully',assetUser:[]}
   } catch (error:unknown) {
      throw error
   }
}

export const deleteAssetUser = async(input:findAssetUserSchemaInput):Promise<{ success: boolean; message: string; assetUser?:AssetUser}>=>{
    try {
          const assetUser = await prisma.assetUser.delete({
             where:{id:input.id}
          })
          if(!assetUser){
             return { success:false, message:'Name already existed in the database'}
          }

      return {success:true, message:'Asset user Created successfully',assetUser}
    } catch (error:unknown) {
       throw error
    }
 }

export const updateAssetUser = async(input:updateAssetUserSchemaInput):Promise<{ success: boolean; message: string; assetUser?:AssetUser}>=>{
    try {
          const user = await prisma.assetUser.findUnique({
            where:{id:input.id}
          })
          if(!user){
             return { success:false, message:'Name already existed in the database'}
          }
          const deptId =  await prisma.department.findUnique({
            where:{id:input.userDeptId}
          })
          if(!deptId){
            return { success:false, message:`incorrect department id ${input.userDeptId}`}
          }

           const assetUser = await prisma.assetUser.update({
            where:{id:input.id},
              data:{
                name:input.name,
                userDeptId:input.userDeptId,
              }
           }) 
           if(!assetUser){
             throw new Error('asset user cannot be updated')
           }

      return {success:true, message:'Asset user Created successfully',assetUser}
    } catch (error:unknown) {
       throw error
    }
 }
