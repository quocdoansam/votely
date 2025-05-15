import React from "react";

interface LogoProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Logo = ({ className = "", ...props }: LogoProps) => {
  return (
    <h1
      style={{ fontFamily: "Pacifico", cursor: "pointer" }}
      {...props}
      className={className}
    >
      Votely
    </h1>
  );
};

export default Logo;
