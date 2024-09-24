import { z } from "zod";
import { UpdateCardOrderSchema } from "./schema";
import { Card } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof UpdateCardOrderSchema>;
export type ReturnType = ActionState<InputType, Card[]>;