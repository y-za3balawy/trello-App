import { z } from "zod";
import { CreateCardSchema } from "./schema";
import { Card } from "@prisma/client";
import { ActionState } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof CreateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;