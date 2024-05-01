export interface IProject {
  _id: string;
  name: string;
  description?: string;
  teamMembers: TeamMember[];
  tasks: ITask[];
  recentActivities?: string[];
}
export interface TeamMember {
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
