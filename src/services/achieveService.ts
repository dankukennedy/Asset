import prisma from '../catalyst/prisma';
import {Achieve} from '@prisma/client'
import { createAchieveSchemaInput, findAchieveSchemaInput, updateAchieveSchemaInput } from '../model/achieveDataTypes';

export const  createAchieve = async(input:createAchieveSchemaInput):Promise<{success:boolean; message:string; achieve?:Achieve}> =>{
   try {
      const user = await prisma.user.findUnique({
        where:{
            id:input.createdById
        }
      })
      if(!user){
        return {success:false, message:'Created User is not found'}
      }

     const  findAchieve = await prisma.achieve.findUnique({
        where:{
            achieveId:input.achieveId
        }
     })
     if(findAchieve){
        return {success:false, message:'Asset Already Achieve'}
     }
     const achieve = await prisma.achieve.create({
        data:{
            year:input.year,
            createdById:input.createdById ,
            achieveId:input.achieveId
          }
     })

    return  {success:true, message:'Achieve Successfully create',achieve}
   } catch (error) {
     throw error
   }
}
export const  findAchieve = async(input:findAchieveSchemaInput):Promise<{success:boolean; message:string; achieve?:Achieve}> =>{
   try {
    
    const achieve = await prisma.achieve.findUnique({
        where:{id:input.id}
    })
      if(!achieve){
        return {success:false, message:'Achieve Already exist'}
      }
    return  {success:true, message:'Achieve Successfully create',achieve}
   } catch (error) {
     throw error
   }
}
export const  allAchieve = async():Promise<{success:boolean; message:string; achieve?:Achieve[]}> =>{
   try {
    const achieve = await prisma.achieve.findMany()
      if(!achieve){
        return {success:false, message:'All Achieve cannot be found'}
      }
      if(achieve.length===0){
        return { success:false, message:'No Achieve Record Found'}
      }

    return  {success:true, message:'Achieve Successfully create',achieve}
   } catch (error) {
     throw error
   }
}
export const  updateAchieve = async(input:updateAchieveSchemaInput):Promise<{success:boolean; message:string; achieve?:Achieve}> =>{
   try {
    const findAchieve = await prisma.achieve.findUnique({
        where:{id:input.id}
    })
    
    if(!findAchieve){
        return {success:false, message:'Achieve Id cannot be found '}
    }
    const updateData ={
        ...(input.achieveId && {achieve:{connect:{id:input.achieveId}}}),
        ...(input.createdById && {createdBy:{connect:{id:input.createdById}}}),
        ...(input.year && {year:input.year})
    }

    const achieve =  await prisma.achieve.update({
        where:{id:input.id},
        data:updateData,
    })
    return  {success:true, message:'Achieve Successfully create',achieve}
   } catch (error) {
     throw error
   }
}
export const  deleteAchieve = async(input:findAchieveSchemaInput):Promise<{success:boolean; message:string; achieve?:Achieve}> =>{
   try {
    const achieve = await prisma.achieve.delete({
        where:{id:input.id}
    })
     if(!achieve){
        return {success:false, message:'Achieve cannot be deleted'}
     }
    return  {success:true, message:'Achieve Successfully create',achieve}
   } catch (error) {
     throw error
   }
}
export const  deleteAllAchieve = async():Promise<{success:boolean; message:string; achieve?:Achieve[]}> =>{
   try {
      const achieve = await prisma.achieve.deleteMany()
      if(!achieve){
        return { success:false, message:'Achieve cannot be deleted'}
      }
      if(achieve.count===0){
       return {success:false, message:'No Achieve Record Found '}
      }

    return  {success:true, message:'Achieve Successfully create',achieve:[]}
   } catch (error) {
     throw error
   }
}