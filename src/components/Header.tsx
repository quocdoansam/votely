import { useResponsive } from "../hooks/useResponsive";
import Logo from "./landing/Logo";
import NavMain from "./navigations/NavMain";
import NavUser from "./navigations/NavUser";

const Header = () => {
  const { isMobile } = useResponsive();
  return (
    <header className='py-4'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex gap-10 lg:gap-20'>
          <a href='/'>
            <Logo />
          </a>
          {!isMobile && <NavMain />}
        </div>
        <NavUser />
      </div>
    </header>
  );
};

export default Header;
