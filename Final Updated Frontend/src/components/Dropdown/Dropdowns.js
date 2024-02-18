import React, { useState } from 'react';

const Dropdown = ({ onAuthorSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('DrMohsinKhan');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAuthorSelection = (authorName) => {
    setSelected(authorName);
    setIsOpen(false);
    onAuthorSelect(authorName);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <h1>Translation</h1>
        <button
          type="button"
          className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={toggleDropdown}
        >
          {selected}
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <li
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleAuthorSelection('MehmoodulHassan')}
            >
              Mehmood ul Hassan
            </li>
            <li
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleAuthorSelection('FatehMuhammadJalandhri')}
            >
             Fateh Muhammad Jalandhri
            </li>
            <li
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleAuthorSelection('DrMohsinKhan')}
            >
              Dr.Mohsin Khan
            </li>
            <li
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              onClick={() => handleAuthorSelection('MuftiTaqiUsmani')}
            >
              Mufti Taqi Usmani
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
