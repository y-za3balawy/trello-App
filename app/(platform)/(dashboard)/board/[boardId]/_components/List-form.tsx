import React, { ElementRef, useRef, useState } from 'react'
import { ListWrapper } from './list-wrapper'
import { Button } from '@/components/ui/button'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { FormInput } from './../../../../../../components/forms/form-inputs';
import { Plus, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FormSubmit } from '@/components/forms/form-submit';
import { useAction } from '@/hooks/use-action';
import { toast } from 'sonner';
import { CraeteList } from '@/actions/create-list';

const Listform = () => {
  const router = useRouter()
  const params = useParams()
  const [isEditing,setEditing] = useState(false)
  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)
  const enableEditing =()=>{
     setEditing(true)
     setTimeout(()=>{
        inputRef.current?.focus()
     })
  }



  const disableEditing = ()=>{
    setEditing(false)
  }

   const {execute , fieldErrors} = useAction(CraeteList, {
    onSuccess:(data)=>{
     
      
      toast.success(`List "${data.title}" created`);
      
      disableEditing()
      router.refresh()
    },
    onError:(error)=>{
        toast.error(error)
    }
   })

  const onkeyDown = (e:KeyboardEvent)=>{
    if(e.key==="Escape"){
        disableEditing()
    }
  }

  useEventListener("keydown",onkeyDown )
  useOnClickOutside(formRef,disableEditing)


  const onSubmit = (formData:FormData)=>{
    const title = formData.get("title") as string
    const boardId = formData.get("boardId") as string

   
    const promise =  execute({title,boardId})
      toast.promise(promise, {
        loading: "create list loading...",
      });
  }

  // const onListcreatedFormSubmit = () => {
  //   const promise = executeDelete({ id: data.id });
  //   toast.promise(promise, {
  //     loading: "Delete list loading...",
  //   });
  // };

    if(isEditing){
        return(
            <ListWrapper>
                <form  action={onSubmit} ref={formRef}
                className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'>
                  <FormInput errors={fieldErrors} 
                  placeholder='Enter list title....' ref={inputRef}  
                  id="title" 
                  className='text-sm px-2 py-1 h-7 font-medium border-transparent
                  hover:border-input focus:border-input transition' />
                <input hidden value={params.boardId} name="boardId"/>
                <div className='flex items-center gap-x-1'>
                    <FormSubmit>
                        Add list
                    </FormSubmit>
                    <Button onClick={disableEditing} variant="ghost" size="sm">
                        <X className=' h-5 w-5'/>
                    </Button>
                </div>
                </form> 
            </ListWrapper>
        )
    }

    return (
    <ListWrapper>
        
           <Button  onClick={enableEditing} className=' text-black w-full rounded-md bg-white/80 hover:bg-white/50
            transition p-3 flex justify-start items-center font-medium text-sm'>
            <Plus className='h-4 w-4 mr-2'/>
            Add a list
           </Button>
        
    </ListWrapper>
  )
}

export default Listform