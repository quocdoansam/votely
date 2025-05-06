import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { NavGroupItem } from "@/types/NavGroupItem";

const NavMain = ({ groups }: { groups: NavGroupItem[] }) => {
  return groups.map((group, groupIndex) => (
    <SidebarGroup
      className='group-data-[collapsible=icon]:hidden'
      key={groupIndex}
    >
      <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
      <SidebarMenu>
        {group.items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <NavLink to={item.url}>
                <item.icon />
                {item.name}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ));
};

export default NavMain;
