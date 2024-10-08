'use client'

import { deleteBoards } from "@/actions/delete-board";
import { Button } from "@/components/ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAction } from '@/hooks/use-action';

import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"


interface BoardOptionsProps{
    id:string
}

const BoardOptions = ({id}:BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoards, {
    onError: (error) => {
      toast.error(error);
    },
  });

    const onDelete = ()=>{
      
        execute({id})

    }

  return (
   <Popover>
  <PopoverTrigger asChild>
    <Button className="h-auto p-2 " variant="transparent">
     <MoreHorizontal className="h-4 w-4"/>
    </Button>
  </PopoverTrigger>
  <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
         <div className="text-sm font-medium text-center text-neutral-600 pb-4">
               Board Actions
         </div>
         <PopoverClose asChild>

            <Button variant="ghost" className="h-auto p-2 top-2 right-2 absolute w-auto text-neutral-600">
                <X className="h-4 w-4"/>
            </Button>

         </PopoverClose>
         <Button
         variant="ghost"
          onClick={onDelete}
         disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
            Delete this Board
          </Button>
  </PopoverContent>
</Popover>
  )
}

export default BoardOptions