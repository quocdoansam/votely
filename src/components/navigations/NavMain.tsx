import { HelpCircle, LayoutDashboard, PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";

const NavMain = () => {
  return (
    <ul className='flex flex-row justify-center gap-8'>
      <Link
        to={"/"}
        className='cursor-pointer text-base font-semibold flex items-center hover:opacity-50 gap-2'
      >
        <LayoutDashboard />
        Dashboard
      </Link>

      <Link
        to={"/create"}
        className='cursor-pointer text-base font-semibold flex items-center hover:opacity-50 gap-2'
      >
        <PackagePlus />
        Create Survey
      </Link>
      <Link
        to={"/help"}
        className='cursor-pointer text-base font-semibold flex items-center hover:opacity-50 gap-2'
      >
        <HelpCircle />
        Help Center
      </Link>
    </ul>
  );
};

export default NavMain;
