import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchQuran } from '../../redux/actions/search';
import Draggable from 'react-draggable';
import VirtualKeyboard from '../VR keyboard/VirtualKeyboard';
import { BsFillKeyboardFill } from 'react-icons/bs';
import '../../constants/fonts.css';
import { MdOutlineContentCopy } from "react-icons/md";

const SearchByWord = ({ searchQuran, ayatData }) => {
  const [query, setQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [toggle, setToggle] = useState(false);
  const [ayatDataVisible, setAyatDataVisible] = useState(true);
  const [selectedTranslation, setSelectedTranslation] = useState('');
  console.log(selectedTranslation);

  const handleInputChange = (value) => {
    if (value === 'Backspace') {
      setQuery(query.slice(0, -1));
    } else {
      setQuery(query + value);
    }
  };

  const handleSearchClick = () => {
    searchQuran(query, selectedAuthor, selectedTranslation);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text successfully copied to clipboard');
      },
      (err) => {
        console.error('Unable to copy text to clipboard', err);
      }
    );
  };

  const copyAyatToClipboard = (ayatTextArray) => {
    const nonEmptyStrings = ayatTextArray.filter((text) => typeof text === 'string' && text.trim() !== '');
  
    if (nonEmptyStrings.length > 0) {
      const concatenatedText = nonEmptyStrings.join('\n');
      navigator.clipboard.writeText(concatenatedText).then(
        () => {
          console.log('Text successfully copied to clipboard');
        },
        (err) => {
          console.error('Unable to copy text to clipboard', err);
        }
      );
    } else {
      console.warn('No valid strings to copy to clipboard');
    }
  };

  const handleTranslationChange = (e) => {
    setSelectedTranslation(e.target.value);
  };

  const toggleAyatDataVisibility = () => {
    setAyatDataVisible(!ayatDataVisible);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const authors = ['MuftiTaqiUsmani', 'MehmoodulHassan', 'DrMohsinKhan', 'FatehMuhammadJalandhri'];
  const translators = ['TarjumaLafziFahmulQuran', 'TarjumaLafziNazarAhmad', 'TarjumaLafziDrFarhatHashmi'];

  return (
    <div className="p-4 relative">
      <div className="flex flex-col sm:flex-row items-center mb-4">
        <BsFillKeyboardFill className='w-10 h-6 cursor-pointer mb-2 sm:mb-0 mr-4' onClick={() => { setToggle(!toggle) }} />
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onClick={toggleAyatDataVisibility}
          placeholder="Enter search term"
          className="p-2 border rounded mb-2 sm:mb-0 mr-4"
        />
        <div className='flex flex-col sm:flex-row gap-2'>
          <select
            value={selectedAuthor}
            onChange={handleAuthorChange}
            className="p-2 border rounded mb-2 sm:mb-0"
          >
            <option value="">Select Author</option>
            {authors.map((author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            ))}
          </select>
          <select
            value={selectedTranslation}
            onChange={handleTranslationChange}
            className="p-2 border rounded mb-2 sm:mb-0"
          >
            <option value="">Translation</option>
            {translators.map((translator, index) => (
              <option key={index} value={translator}>
                {translator}
              </option>
            ))}
            {/* <option value="TarjumaLafziFahmulQuran">TarjumaLafziFahmulQuran</option> */}
            {/* Add more translation options if needed */}
          </select>
        </div>
        <button className="p-2 bg-blue-500 text-white rounded ml-2" onClick={handleSearchClick}>Search</button>
      </div>

      {ayatDataVisible && ayatData && ayatData.length > 0 ? (
        <Draggable>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-lg w-80 max-h-80 overflow-y-auto">
            <button className="absolute top-0 right-0 p-2 cursor-pointer" onClick={toggleAyatDataVisibility}>
              X
            </button>
            {ayatData.map((ayat, index) => (
              <div key={index} className="flex flex-col items-center justify-center border p-2 mb-2 rounded font-[CustomFontName]">
                <p className="w-1/5 bg-orange-100 text-orange-500 text-sm font-bold p-1 rounded-lg">{ayat.SurahNo}:{ayat.AyatNo}</p>
                {/* <p className="text-lg">{ayat.AyatNew}</p> */}
                <div>
                                        <p className="text-gray-600">{ayat.MuftiTaqiUsmani}</p>
                                        {/* <button onClick={() => copyAyatToClipboard(ayat.MuftiTaqiUsmani)}><MdOutlineContentCopy /></button> */}
                                        <button onClick={() => copyAyatToClipboard([ayat.MuftiTaqiUsmani, ayat.DrMohsinKhan, ayat.MehmoodulHassan, ayat.FatehMuhammadJalandhri])}>
            <MdOutlineContentCopy />
          </button>
                                    </div>
                <div>
                <p className="text-gray-600">{ayat.AyatNew}</p>
                <button
                    onClick={() => copyToClipboard(ayat.Ayat)}
                 >
                 <MdOutlineContentCopy />
                   </button>
                </div>

                <div>
                                        <p className="text-gray-600">{ayat.TarjumaLafziFahmulQuran}</p>
                                        {/* <button onClick={() => copyAyatToClipboard(ayat.MuftiTaqiUsmani)}><MdOutlineContentCopy /></button> */}
                                        <button onClick={() => copyAyatToClipboard([ayat.TarjumaLafziFahmulQuran, ayat.TarjumaLafziNazarAhmad, ayat.TarjumaLafziDrFarhatHashmi])}>
            <MdOutlineContentCopy />
          </button>
                                    </div>
                
                                    <div>
                                        <p className="text-gray-600">{ayat.TarjumaLafziNazarAhmad}</p>
                                        {/* <button onClick={() => copyAyatToClipboard(ayat.MuftiTaqiUsmani)}><MdOutlineContentCopy /></button> */}
                                  
                                    </div>
                                    <div>
                                        <p className="text-gray-600">{ayat.TarjumaLafziDrFarhatHashmi}</p>
                                        {/* <button onClick={() => copyAyatToClipboard(ayat.MuftiTaqiUsmani)}><MdOutlineContentCopy /></button> */}
                                     
                                    </div>
          

                
                {/* <p className="text-gray-600">{ayat.TarjumaLafziDrFarhatHashmi}</p>
                <p className="text-gray-600">{ayat.TarjumaLafziFahmulQuran}</p>
                <p className="text-gray-600">{ayat.TarjumaLafziNazarAhmad}</p> */}
              </div>
            ))}
          </div>
        </Draggable>
      ) : (
        <Draggable>
          <div className="text-center text-red-500 absolute top-0 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-lg w-80 max-h-80 overflow-y-auto">
            No result found
          </div>
        </Draggable>
      )}

      {toggle && <VirtualKeyboard onKeyPress={handleInputChange} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ayatData: state.search.results,
});

const mapDispatchToProps = (dispatch) => ({
  searchQuran: (query, author, translation) => dispatch(searchQuran(query, author, translation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchByWord);
