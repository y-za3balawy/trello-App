import { ClerkProvider } from "@clerk/nextjs"


const clerkLayout = ({children}:{children:React.ReactNode}) => {
  return (

  <div className=" flex h-full  items-center justify-center">
    {children}
  </div>
  

  )
}

export default clerkLayout