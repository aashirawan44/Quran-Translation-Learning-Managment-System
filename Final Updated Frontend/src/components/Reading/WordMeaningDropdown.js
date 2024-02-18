import React, { useState } from 'react';
import "../../constants/fonts.css"
const WordMeaningDropdown = ({ wordsAndMeanings, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={handleDropdownClick}>
        {isOpen ? '▲' : '▼'} {/* Up arrow if open, down arrow if closed */}
      </div>
      {isOpen && (
        <table className="w-full bg-gray-100 border border-gray-300 m-2">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Word</th>
              <th className="py-2 px-4 text-left">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {wordsAndMeanings.map((wordMeaning, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="py-2 px-4 font-[CustomFontName] text-xl">{wordMeaning.word}</td>
                <td className="py-2 px-4 font-[CustomFontName] text-xl">{wordMeaning.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* <button className="close-button" onClick={onClose}>
        Close
      </button> */}
    </div>
  );
};

export default WordMeaningDropdown;
