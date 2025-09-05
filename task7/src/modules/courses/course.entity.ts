export interface ICourse {
  id: string;
  title: string;
  description: string;
  image?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
}
