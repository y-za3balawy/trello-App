'use client' 
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';


interface FormSubmitProps{
    children: React.ReactNode;
    disabled?:boolean;
    className?:string;
    varient?:'default'|'destructive'| 'outline'|'secondary'|'ghost'|'link'|'primary'
}


export const FormSubmit =({
    children, disabled,className,varient='primary'
}:FormSubmitProps)=>{
    const {pending} = useFormStatus()
    return(
        <Button  variant={varient}   disabled={pending || disabled} type='submit'   size='sm' className={cn(className)}>
             {children}
        </Button>
    )
}