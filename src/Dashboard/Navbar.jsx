import React from 'react';

function Navbar({ toggleSidebar }) {
  return (
    <nav className=" text-white sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Menu Button */}
        <button
          onClick={toggleSidebar}
          className="text-red-500 focus:outline-none md:hidden"
        >
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        
      </div>
    </nav>
  );
}

export default Navbar;
