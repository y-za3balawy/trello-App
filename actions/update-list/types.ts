import { z } from "zod";
import { UpdateListSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof UpdateListSchema>;
export type ReturnType = ActionState<InputType, List>;