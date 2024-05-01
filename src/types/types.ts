export interface IProject {
  _id: string;
  name: string;
  description?: string;
  teamMembers: TeamMember[];
  tasks: ITask[];
  recentActivities?: string[];
}
export interface IUser {
  _id: string;
  email: string;
}
export interface TeamMember {
  _id:string;
  email: string;
}
export interface ITask {
  _id: string;
  title: string;
  assignedTo: TeamMember;
  status: IStatus;
  description?: string;
  deadline: Date;
}

export type IStatus = "To Do" | "In Progress" | "Done";
