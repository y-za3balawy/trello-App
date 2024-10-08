"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteListSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { id } = data;

  let list;
  try {
    list = await db.list.delete({
      where: {
        id,
        board: {
          orgId,
        },
      },
    });
    await createAuditLog({
      action: ACTION.DELETE,
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return {
      error: "Failed to delete list.",
    };
  }
  revalidatePath(`/board/${list.boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteListSchema, handler);