import { IFreelancer } from "../interface/IFreelancer";

export class Freelancer implements IFreelancer{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    
    constructor(data?: any){
        this.id = data?.id || "";
        this.email = data?.email || "";
        this.firstName = data?.firstName || "";
        this.lastName = data?.lastName || "";
    }
}