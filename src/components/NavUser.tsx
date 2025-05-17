import { useState, useRef, useEffect } from "react";
import { PlusCircle, Search, User2 } from "lucide-react";
import Button from "./button/Button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { useResponsive } from "../hooks/useResponsive";

const NavUser = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isLoading, logout } = useAuth();
  const navigator = useNavigate();
  const { isMobile, isDesktop } = useResponsive();

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
          onClick={() => navigator("/login")}
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-2 ml-auto'>
      {isMobile && (
        <Button variant='secondary' size='icon'>
          <Search />
        </Button>
      )}
      <Button
        variant='secondary'
        size={isDesktop ? "md" : "icon"}
        onClick={() => navigator("/elections/create")}
      >
        {isDesktop ? "Create election" : <PlusCircle />}
      </Button>

      <div className='relative' ref={dropdownRef}>
        <Button
          variant='primary'
          size='icon'
          onClick={() => setOpen((prev) => !prev)}
        >
          <User2 />
        </Button>

        <div
          className={`absolute right-0 mt-2 w-62 bg-white shadow-xl rounded-xl border-2 border-secondary z-50 transition-all duration-200 origin-top-right overflow-hidden ${
            open
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible pointer-events-none"
          }`}
        >
          <ul>
            <h1 className='text-base font-semibold px-4 py-2'>
              Hi, {user?.name}
            </h1>
            <Divider />
            <li className='m-2 rounded-xl font-semibold text-base px-4 py-2 hover:bg-secondary cursor-pointer'>
              Profile
            </li>
            <li className='m-2 rounded-xl font-semibold text-base px-4 py-2 hover:bg-secondary cursor-pointer'>
              My elections
            </li>
            <Divider />
            <li
              className='m-2 rounded-xl text-danger font-semibold text-base px-4 py-2 hover:bg-secondary cursor-pointer'
              onClick={logout}
            >
              Đăng xuất
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
