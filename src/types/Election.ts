export type Election = {
  id: string;
  creator: string;
  title: string;
  desc: string;
  isPrivate: boolean;
  options: string[];
  startTime: Date;
  endTime: Date;
};
