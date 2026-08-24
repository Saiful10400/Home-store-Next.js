import React from "react";
 


const MobileNav: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky bottom-0 left-0 z-50 md:hidden ">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">My App</h1>
      </div>
    </nav>
  );
};

export default MobileNav;