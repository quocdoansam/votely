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
      <div className='flex flex-row gap-2 ml-auto'>
        <div className='w-[120px] h-[40px] animate-pulse bg-secondary rounded-xl'></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex flex-row gap-2 ml-auto'>
        <Button variant='primary' size='md' onClick={() => navigator("/login")}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-row gap-2 ml-auto'>
      {!isDesktop ? (
        <>
          {isMobile && (
            <Button variant='secondary' size='icon'>
              <Search />
            </Button>
          )}
          <Button variant='secondary' size='icon'>
            <PlusCircle />
          </Button>
        </>
      ) : (
        <Button variant='secondary' size='md' className='h-10'>
          Create election
        </Button>
      )}

      <div className='relative' ref={dropdownRef}>
        <Button
          variant='primary'
          size='icon'
          onClick={() => setOpen((prev) => !prev)}
        >
          <User2 />
        </Button>

        <div
          className={`absolute p-3 right-0 mt-2 w-72 bg-white shadow-xl rounded-xl border-2 border-secondary z-50 transition-all duration-200 origin-top-right ${
            open
              ? "opacity-100 scale-100 visible"
              : "opacity-0 scale-95 invisible pointer-events-none"
          }`}
        >
          <h1 className='text-base pb-2'>Hi, {user?.name}</h1>
          <Divider />

          <ul>
            <li className='font-semibold text-base px-4 py-2 hover:bg-secondary rounded-lg cursor-pointer'>
              Thông tin cá nhân
            </li>
            <Divider />
            <li className='font-semibold text-base px-4 py-2 hover:bg-secondary rounded-lg cursor-pointer'>
              Thông tin cá nhân
            </li>
            <li className='font-semibold text-base px-4 py-2 hover:bg-secondary rounded-lg cursor-pointer'>
              Cài đặt
            </li>
            <Divider />

            <li
              className='text-danger font-semibold text-base px-4 py-2 hover:bg-secondary rounded-lg cursor-pointer'
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
