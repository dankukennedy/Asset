import prisma from '../catalyst/prisma';
import {Rooms} from '@prisma/client'
import { createRoomSchemaInput, findRoomSchemaInput, updateRoomSchemaInput } from '../model/roomDataTypes';

export const createRoom = async(input:createRoomSchemaInput):Promise<{success:boolean, message:string, room?:Rooms;}>=>{
    try {
        const roomLabel = await prisma.rooms.findUnique({
            where:{label:input.label}, include:{createdBy:true}
        })
        if(roomLabel){
            return {success:false, message:'Room Label already Existed'}
        }

        const room =  await  prisma.rooms.create({
            data:{
                ...input
            }
        })

        if(!room){
            return  {success:false, message:'Room cannot be created'}
        }

        return {success:true, message:'Rooms created Successfully', room}
    } catch (error:unknown) {
        throw error
    }
}

export const findRoom = async(input:findRoomSchemaInput):Promise<{success:boolean, message:string, room?:Rooms;}>=>{
    try {
        const room = await prisma.rooms.findUnique({
            where:{id:input.id}
        })
        if(!room){
            return {success:false, message:'Room Label already Existed'}
        }

        return {success:true, message:'Room created Successfully', room}
    } catch (error:unknown) {
        throw error
    }
}

export const updateRoom = async(input:updateRoomSchemaInput):Promise<{success:boolean, message:string, room?:Rooms;}>=>{
    try {
        const roomLabel = await prisma.rooms.findUnique({
            where:{id:input.id}
        })
        if(!roomLabel){
            return {success:false, message:`Room Label does not with ID  does not exist`}
        }

       const room = await prisma.rooms.update({
           where:{id:input.id},
            data:{
                ...input
            }
       })
         if(!room){
            return {success:true, message:'Room cannot be created '}
         }


        return {success:true, message:'Room created Successfully', room}
    } catch (error:unknown) {
        throw error
    }
}

export const findAllRooms = async():Promise<{success:boolean, message:string, rooms?:Rooms[];}>=>{
    try {

        const rooms =  await prisma.rooms.findMany()

        if(!rooms.length){
            return  {success:false, message:'No Rooms records'}
        }
        if(!rooms){
            return  {success:false, message:'Rooms cannot be found'}
        }

        return {success:true, message:'Rooms created Successfully', rooms}
    } catch (error:unknown) {
        throw error
    }
}

export const deleteRoom = async(input:findRoomSchemaInput):Promise<{success:boolean, message:string, room?:Rooms;}>=>{
    try {
        const findRoom = await prisma.rooms.findUnique({
            where:{id:input.id}
        })
        if(!findRoom){
            return {success:false, message:'Room cannot be found'}
        }

        const room = await  prisma.rooms.delete({
            where:{id:input.id}
        })

        return {success:true, message:'Rooms created Successfully', room}
    } catch (error:unknown) {
        throw error
    }
}

export const deleteAllRoom = async():Promise<{success:boolean, message:string, rooms?:Rooms[];}>=>{
    try {
       const rooms = await prisma.rooms.deleteMany()

       if(rooms.count===0){
        return { success:false, message:' No Rooms found to be deleted' }
       }
       if(!rooms){
        return { success:false, message:' No block Rooms to be deleted' }
       }

        return {success:true, message:'Rooms created Successfully', rooms:[]}
    } catch (error:unknown) {
        throw error
    }
}