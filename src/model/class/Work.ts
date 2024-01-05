import { Freelancer, IFreelancer, IWork } from "..";

export class Work implements IWork {
  name: string;
  description: string;
  amount: string;
  start: string;
  finish: string;
  freelancer?: IFreelancer;
  state: number;
  isActive: boolean;
  workId: string;

  constructor(data?: any) {
    this.name = data?.name || "";
    this.description = data?.description || "";
    this.amount = data?.amount || "";
    this.start = data?.start || "";
    this.finish = data?.finish || "";
    this.state = data?.state || 1;
    this.isActive = data?.isActive || true;
    this.workId = data?.workId || "";
    this.freelancer = data?.freelancer || new Freelancer();
  }
}
