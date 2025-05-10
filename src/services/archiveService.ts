import prisma from '../catalyst/prisma';
import {Archive} from '@prisma/client'
import { createArchiveSchemaInput, findArchiveSchemaInput, updateArchiveSchemaInput } from '../model/archiveDataTypes';

export const  createArchive = async(input:createArchiveSchemaInput):Promise<{success:boolean; message:string; archive?:Archive}> =>{
   try {
      const user = await prisma.user.findUnique({
        where:{
            id:input.createdById
        }
      })
      if(!user){
        return {success:false, message:'Created User is not found'}
      }

     const  findArchive = await prisma.archive.findUnique({
        where:{
            archiveId:input.archiveId
        }
     })
     if(findArchive){
        return {success:false, message:'Asset Already Achieve'}
     }
     const archive = await prisma.archive.create({
        data:{
            year:input.year,
            createdById:input.createdById ,
            archiveId:input.archiveId
          }
     })

    return  {success:true, message:'Archive Successfully create',archive}
   } catch (error) {
     throw error
   }
}
export const  findArchive = async(input:findArchiveSchemaInput):Promise<{success:boolean; message:string; archive?:Archive}> =>{
   try {
    
    const archive = await prisma.archive.findUnique({
        where:{id:input.id}
    })
      if(!archive){
        return {success:false, message:'Archive Already exist'}
      }
    return  {success:true, message:'Archive Successfully create',archive}
   } catch (error) {
     throw error
   }
}
export const  allArchive = async():Promise<{success:boolean; message:string; archive?:Archive[]}> =>{
   try {
    const archive = await prisma.archive.findMany()
      if(!archive){
        return {success:false, message:'All Archive cannot be found'}
      }
      if(archive.length===0){
        return { success:false, message:'No Archive Record Found'}
      }

    return  {success:true, message:'Archive Successfully create',archive}
   } catch (error) {
     throw error
   }
}
export const  updateArchive = async(input:updateArchiveSchemaInput):Promise<{success:boolean; message:string; archive?:Archive}> =>{
   try {
    const findArchive = await prisma.archive.findUnique({
        where:{id:input.id}
    })
    
    if(!findArchive){
        return {success:false, message:'Archive Id cannot be found '}
    }
    const updateData ={
        ...(input.archiveId && {archive:{connect:{id:input.archiveId}}}),
        ...(input.createdById && {createdBy:{connect:{id:input.createdById}}}),
        ...(input.year && {year:input.year})
    }

    const archive =  await prisma.archive.update({
        where:{id:input.id},
        data:updateData,
    })
    return  {success:true, message:'Archive Successfully create',archive}
   } catch (error) {
     throw error
   }
}
export const  deleteArchive = async(input:findArchiveSchemaInput):Promise<{success:boolean; message:string; archive?:Archive}> =>{
   try {
    const archive = await prisma.archive.delete({
        where:{id:input.id}
    })
     if(!archive){
        return {success:false, message:'Archive cannot be deleted'}
     }
    return  {success:true, message:'Archive Successfully create',archive}
   } catch (error) {
     throw error
   }
}
export const  deleteAllArchive = async():Promise<{success:boolean; message:string; archive?:Archive[]}> =>{
   try {
      const archive = await prisma.archive.deleteMany()
      if(!archive){
        return { success:false, message:'Archive cannot be deleted'}
      }
      if(archive.count===0){
       return {success:false, message:'No Archive Record Found '}
      }

    return  {success:true, message:'Archive Successfully create',archive:[]}
   } catch (error) {
     throw error
   }
}