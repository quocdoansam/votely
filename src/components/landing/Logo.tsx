interface LogoProps {
  size?: number;
}

const Logo = ({ size = 64 }: LogoProps) => {
  return (
    <img
      src='./logo.svg'
      alt='Logo'
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Logo;
