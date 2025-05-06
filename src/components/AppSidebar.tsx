"use client";
import * as React from "react";
import { GalleryVerticalEnd, UsersRound } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/NavUser";
import Logo from "../../public/logo.svg";
import NavMain from "./NavMain";

const groups = [
  {
    title: "Election",
    items: [
      {
        name: "All Elections",
        url: "/",
        icon: GalleryVerticalEnd,
      },
    ],
  },
  {
    title: "US",
    items: [
      {
        name: "About US",
        url: "/about-us",
        icon: UsersRound,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='/'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <img src={Logo} alt='Logo' />
                </div>
                <div className='grid flex-1 text-left leading-tight'>
                  <span className='truncate font-bold text-md'>Votely</span>
                  <span className='truncate text-xs'>
                    A voting blockchain integration
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={groups} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
