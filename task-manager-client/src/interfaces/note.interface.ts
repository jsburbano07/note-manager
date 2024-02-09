export interface INote {
  _id?:string
  title: string;
  content: string;
  isActive: boolean;
  tags: string[];
  createdAt: Date;
  completed: boolean;
}