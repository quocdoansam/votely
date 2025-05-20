import Logo from "./landing/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='py-4 text-sm'>
      <div className='flex flex-col-reverse md:flex-row justify-center items-center gap-4'>
        <div className='flex gap-2 items-center'>
          <a href='/' className='cursor-pointer'>
            <Logo size={24} />
          </a>
          <span className='text-xl font-semibold'>&copy;</span>
          <time className='text-sm'>{currentYear}</time>
          <h1 className='text-sm font-semibold'>BlockSurvey</h1>
        </div>
        <div className='flex flex-row gap-4'>
          <a
            href='/about'
            className='cursor-pointer hover:underline hover:text-primary transition'
          >
            About US
          </a>
          <a
            href='/contact'
            className='cursor-pointer hover:underline hover:text-primary transition'
          >
            Contact
          </a>
          <a
            href='/privacy'
            className='cursor-pointer hover:underline hover:text-primary transition'
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
