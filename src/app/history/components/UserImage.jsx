import Image from "next/image";
import React from "react";

const UserImage = ({ imageurl }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-linear-to-tr from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <Image
        src={imageurl}
        width={40}
        height={40}
        alt="User Avatar"
        unoptimized
        quality={100}
        className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl border-2 border-white/10 bg-[#0d1117] object-cover shadow-2xl"
      />
    </div>
  );
};

export { UserImage };
