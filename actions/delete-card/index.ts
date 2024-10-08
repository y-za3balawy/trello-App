"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCardSchema } from "./schema";
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

  let card;
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: true,
      },
    });
    await createAuditLog({
      action: ACTION.DELETE,
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (error) {
    return {
      error: "Failed to delete list.",
    };
  }
  revalidatePath(`/board/${card.list.boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCardSchema, handler);