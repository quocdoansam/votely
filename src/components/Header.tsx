import Logo from "./landing/Logo";
import NavMain from "./NavMain";
import NavUser from "./NavUser";
import SearchBar from "./input/SearchBar";
import { useResponsive } from "../hooks/useResponsive";
import Button from "./button/Button";
import { Menu } from "lucide-react";

const Header = () => {
  const { isTablet, isDesktop } = useResponsive();
  return (
    <div className='flex flex-row p-4 items-center'>
      <div className='flex flex-row gap-2 sm:gap-6'>
        {!isDesktop && (
          <Button variant='text' size='icon'>
            <Menu />
          </Button>
        )}
        <a href='/' className='text-3xl'>
          <Logo />
        </a>
        {isDesktop && (
          <>
            <SearchBar />
            <NavMain />
          </>
        )}
        {isTablet && <SearchBar className='max-w-72' />}
      </div>
      <NavUser />
    </div>
  );
};

export default Header;
