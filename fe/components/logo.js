import React from "react";
import Image from "next/image";

const Logo = ({ width, height }) => {
  return (
    <div className="flex justify-center" style={{marginTop:"-40px",marginBottom:"-20px"}}>
      <Image src="/login.webp" alt="Logo" width={width} height={height} />
    </div>
  );
};

export default Logo;
