// 'use server'    
// import { db } from "@/lib/db"
// import { revalidatePath } from "next/cache"

// export async function create (fromData:FormData ){
//     const title = fromData.get('title') as string
//  await db.board.create({
//     data:{
//         title
//     }
//  })

//  revalidatePath('/organization/org_2dPsohjYguPvbMX35eKWkcQJ1KZ')
// }