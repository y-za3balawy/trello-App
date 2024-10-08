'use server'
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { auth } from '@clerk/nextjs';
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

  


 

const handler = async(data:InputType):Promise<ReturnType>=>{

    const {userId,orgId}= auth()

    if(!userId || !orgId){
        return {
            error:"Unauthorized"
        }
    }

    const {title , id} = data
    
    let board

    try {
        board = await db.board.update({
            where:{
                id,
                orgId
            },
            data:{
                title
            }

        })
        await createAuditLog({
            action: ACTION.DELETE,
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TYPE.CARD,
          });
    } catch (error) {
        return{
            error: "Failed to update board.",
        }
    }

    revalidatePath(`/board/${board.id}`)
    return{
        data:board
    }
}

export const updateBoard = createSafeAction(UpdateBoardSchema,handler)