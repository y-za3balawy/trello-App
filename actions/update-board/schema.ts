
import { title } from 'process'
import {z} from 'zod'

export const  UpdateBoardSchema =z.object({
    title:z.string({
        required_error:'this is required',
        invalid_type_error:'this is required'
    }).min(3,{
        message:'title is too short'
    }),
    id:z.string()
})