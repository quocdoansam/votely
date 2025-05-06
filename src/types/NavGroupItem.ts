import { LucideIcon } from "lucide-react";

export type NavGroupItem = {
  title: string;
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
};
