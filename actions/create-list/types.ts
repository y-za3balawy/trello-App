import { z } from "zod";
import { craeteList } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Board, List } from "@prisma/client";



export type InputType = z.infer<typeof craeteList>
export type ReturnType = ActionState<InputType , List>