import { auth } from "@clerk/nextjs"
import DrgControl from "./_components/org-control"
import { startCase } from "lodash"





export async function generateMetadata(){
    const {orgSlug} = auth()
    return{
        title:startCase(orgSlug||"organization")
    }
}



const  OrganizationIdLayout = ({children}:{children:React.ReactNode})=>{

    return (
        <>
        <DrgControl/>

        {children}
        </>
    )
}

export default OrganizationIdLayout