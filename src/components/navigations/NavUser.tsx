import { useState, useRef, useEffect } from "react";
import {
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlusIcon,
  Settings,
  User,
  UserCircle,
} from "lucide-react";
import Button from "../button/Button";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../Divider";
import { useResponsive } from "../../hooks/useResponsive";

const NavUser = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { isTablet, isMobile } = useResponsive();

  const items = [
    [
      { path: "/profile", icon: UserCircle, title: "Profile" },
      { path: "/account", icon: User, title: "Account" },
    ],
    [
      { path: "/", icon: LayoutDashboard, title: "Dashboard" },
      { path: "/settings", icon: Settings, title: "Settings" },
      { path: "/help", icon: HelpCircle, title: "Help Center" },
    ],
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className='flex flex-row gap-2 ml-auto animate-pulse'>
        <div className='w-20 h-10 bg-secondary rounded-xl' />
        <div className='w-10 h-10 bg-secondary rounded-xl' />
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex flex-row gap-2 ml-auto'>
        <Button
          variant='primary'
          size='md'
          className='h-10'
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-2'>
      <div className='relative' ref={dropdownRef}>
        {!isMobile ? (
          <div
            className='flex flex-row items-center gap-4 cursor-pointer hover:opacity-50 transition'
            onClick={() => setOpen((prev) => !prev)}
          >
            <img
              src={user.avatarUrl || "/default-avatar.png"}
              alt='Avatar'
              className='w-12 aspect-square rounded-full border-2 border-primary'
            />
            {!isTablet && (
              <span className='font-semibold'>{user.name.toUpperCase()}</span>
            )}
          </div>
        ) : (
          <div className='flex flex-row gap-2'>
            <Button
              variant='secondary'
              size='icon'
              onClick={() => setOpen((prev) => !prev)}
            >
              <PackagePlusIcon />
            </Button>
            <Button
              variant='primary'
              size='icon'
              onClick={() => setOpen((prev) => !prev)}
            >
              <Menu />
            </Button>
          </div>
        )}

        <div
          className={`absolute right-0 mt-2 w-62 bg-white shadow-xl rounded-xl border-2 border-secondary z-50 transition-all duration-200 origin-top-right overflow-hidden ${
            open
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible pointer-events-none"
          }`}
        >
          <ul>
            <div className='px-4 py-2 text-base font-semibold'>
              Hi, {user.name}
            </div>
            <Divider />
            {items.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    className='m-2 cursor-pointer text-base font-semibold flex items-center hover:opacity-50 gap-4 px-4 py-2'
                    onClick={() => setOpen(false)}
                  >
                    <item.icon />
                    {item.title}
                  </Link>
                ))}
                <Divider />
              </div>
            ))}
            <li
              className='m-2 cursor-pointer text-base font-semibold flex items-center hover:opacity-50 gap-4 px-4 py-2 text-danger'
              onClick={() => {
                setOpen(false);
                logout();
              }}
            >
              <LogOut />
              Log out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
