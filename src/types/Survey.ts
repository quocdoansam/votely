export type Survey = {
  id: string;
  creator: string;
  title: string;
  desc: string;
  options: string[];
  startTime: Date;
  endTime: Date;
  createdAt: Date;
};
