'use client'
import { Board } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { ElementRef } from 'react';
import { FormInput } from '@/components/forms/form-inputs';
import { useAction } from '@/hooks/use-action';
import { updateBoard } from '@/actions/update-board';
import { toast } from 'sonner';

interface BoardTitleProps{
    data:Board
}

    export const BoardTitle =({data}:BoardTitleProps)=>{

      const {execute} = useAction(updateBoard, 
        {onSuccess:(data)=>{
         
          toast.success(`Board ${data.title} updated`)
          setTitle(data.title)
          disableEditing()
        },
      onError:(error)=>{
         toast.error(error)
      }
    }
      )

        const formRef = useRef<ElementRef<'form'>>(null)
        const inputRef = useRef<ElementRef<"input">>(null);
        const [title,setTitle] = useState(data.title)
        const [isEditing,setEditing] = useState(false)

        const enableEditing=()=>{
            setEditing(true)
        }
        const disableEditing =()=>{
            setEditing(false)
        }

        const onSubmit = (formData: FormData) => {
            const title = formData.get("title") as string;
            
            execute({
              id:data.id,
              title
            })
            
        
        }
        const onBlur = ()=>{
            formRef.current?.requestSubmit()
        }
        if (isEditing) {
            return (
              <form
                action={onSubmit}
                ref={formRef}
                className="flex items-center gap-x-2"
              >
                <FormInput
                  ref={inputRef}
                  id="title"
                  onBlur={onBlur}
                  defaultValue={title}
                  className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
              </form>
            );
          }
        return( 
           <Button onClick={enableEditing} variant='transparent' className='font-bold 
          w-auto p-1 px-2 text-lg h-auto'>
            {title}
           </Button>
          
        )
    }