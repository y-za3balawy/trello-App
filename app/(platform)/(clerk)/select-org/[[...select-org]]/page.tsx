import { OrganizationList } from "@clerk/nextjs";


export default function CreateOrganizationPage(){
    return(
        <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl='/organiztion/:id'
        afterCreateOrganizationUrl='/organiztion/:id'/>
    )
} 