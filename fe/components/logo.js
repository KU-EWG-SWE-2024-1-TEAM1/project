import React from "react";
import Image from "next/image";

const Logo = ({ width, height }) => {
  return (
    <div className="flex justify-center mb-4">
      <Image src="/logo.png" alt="Logo" width={width} height={height} />
    </div>
  );
};

export default Logo;
