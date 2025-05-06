"use client";
import * as React from "react";
import { Wallet, Boxes } from "lucide-react";

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
import { NavMain } from "@/components/NavMain";
import Logo from "../../../public/logo.svg";

const data = {
  navMain: [
    {
      title: "Elections",
      url: "#",
      icon: Boxes,
      isActive: true,
      items: [
        {
          title: "Create an election",
          url: "/create-election",
        },
        {
          title: "My election",
          url: "#",
        },
        {
          title: "Ongoing",
          url: "#",
        },
        {
          title: "Not started",
          url: "#",
        },
        {
          title: "Ended",
          url: "#",
        },
      ],
    },
    {
      title: "Wallet",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "My wallet",
          url: "/wallet",
        },
        {
          title: "Why wallet?",
          url: "/why-wallet",
        },
      ],
    },
  ],
};

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
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
