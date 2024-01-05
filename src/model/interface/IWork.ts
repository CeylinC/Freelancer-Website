import { IFreelancer } from "./IFreelancer";

export interface IWork {
  name: string;
  description: string;
  amount: string;
  start: string;
  finish: string;
  freelancer?: IFreelancer;
  state: number;
  isActive?: boolean;
  workId: string;
}
