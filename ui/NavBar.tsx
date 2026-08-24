import React from "react";


const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 left-0 z-50 hidden md:block">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">My App</h1>
      </div>
    </nav>
  );
};

export default NavBar;