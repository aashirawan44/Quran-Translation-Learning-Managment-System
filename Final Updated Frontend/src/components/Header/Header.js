import React from 'react'
import { useState } from 'react';
import { BsFillKeyboardFill } from 'react-icons/bs';
import { searchQuran } from '../../redux/actions/search';
import { connect} from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai'
import '../../constants/fonts.css'
import Draggable from 'react-draggable';
import { setAlert } from '../../redux/actions/alert';


import Typed from 'react-typed';
import './header.css'
import { MdOutlineContentCopy } from "react-icons/md";

import VirtualKeyboard from '../VR keyboard/VirtualKeyboard';

const Header = ({ searchQuran, ayatData }) => {
    const [query, setQuery] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [toggle, setToggle] = useState(false);
    const [ayatDataVisible, setAyatDataVisible] = useState(true);

    console.log("query", query);


    const [inputValue, setInputValue] = useState('');

    const handleSearchClick = () => {
        searchQuran(query, selectedAuthor);
    };

    const handleInputChange = (value) => {
        if (value === 'Backspace') {
            setQuery(query.slice(0, -1));
        } else {
            setQuery(query + value);
        }
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

    const authors = ['FatehMuhammadJalandhri', 'MuftiTaqiUsmani', 'MehmoodulHassan', 'DrMohsinKhan'];

    function handleChildData(data) {
        console.log('Data received from child:', data);
        setSearchValue(data);
    }

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
      
      

    return (

        <>
            <div className='bg-gradient-to-r from-[#99FFDA] via-[#8CE8C6] to-[#00A86B] w-full py-[50px]'>
                <div className='my-[50px] mx-auto text-center font-bold '>
                    <div className='text-2xl text-white '>
                        Learn With us
                    </div>
                    <div className='text-4xl md:text-4xl mt-8 text-white'>
                        <Typed className='mt-[40px] font-[CustomFontName] '
                            strings={['بِسۡمِ اللّٰہِ الرَّحۡمٰنِ الرَّحِیۡمِ', ' اَلۡحَمۡدُ لِلّٰہِ رَبِّ الۡعٰلَمِیۡنَ ۙ ', 'الرَّحۡمٰنِ الرَّحِیۡم', 'مٰلِکِ یَوۡمِ الدِّیۡنِ(3)']}
                            typeSpeed={100}
                            loop={true}
                        />
                    </div>
                    <div className='text-[#F9DFAD] text-xl md:text-[50px] md:mt-12'>
                        {/* <Typed
                            strings={['In the Name of Allah—the Most Compassionate, Most Merciful.', 'All praise is for Allah—Lord of all worlds,', 'the Most Compassionate, Most Merciful,','Master of the Day of Judgment.']}
                            typeSpeed={100}
                            loop={true}
                        /> */}
                    </div>

                </div>

                <div className='flex justify-center'>
                    {/* <div className='flex justify-between items-center bg-white shadow-lg w-3/6 h-8 md:h-14 mt-6 z-0 absolute'>
                        <div className='flex flex-row'>
                            <div className='flex items-center'>
                                <AiOutlineSearch className='w-6 h-6 ml-4 text-gray-500' />
                            </div>
                            <div className='flex ml-2 '>
                                {inputValue === '' ?
                                    <input className=" placeholder:text-slate-400 md:placeholder:text-[20px] bg-white border-none rounded-md py-2 pl-3 md:pl-9 pr-3 focus:outline-none text-[18px] md:text-md" placeholder='Search' type="text" name="search" />
                                    :
                                    <input value={inputValue} className="placeholder:text-slate-400 md:placeholder:text-[20px] block bg-white  md:w-96 border-none rounded-md py-2 pl-3 md:pl-9 pr-3 focus:outline-none text-[10px] md:text-md" placeholder='Search' type="text" name="search" />

                                }
                            </div>
                        </div>
                        <div className='flex flex-row gap-16 items-center mr-4'>

                            <BsFillKeyboardFill className='w-10 h-6' onClick={() => { setToggle(!toggle) }} />

                            <button className='bg-[#00A86B] text-white text-[10px] md:text-[16px] font-bold w-16 h-7 md:w-24 md:h-10'>
                                Search
                            </button>
                        </div>

                    </div> */}
                    <div className="flex justify-center">
                        <div className='flex justify-between items-center bg-white shadow-lg w-full md:w-3/6 h-10 md:h-14 mt-6 z-0 absolute p-2'>

                            <BsFillKeyboardFill className='w-8 h-6 md:w-10 md:h-6 cursor-pointer mr-4' onClick={() => { setToggle(!toggle) }} />
                            <input
                                type="text"
                                value={query}
                                onChange={handleQueryChange}
                                onClick={toggleAyatDataVisibility}
                                placeholder="Enter search term"
                                className="placeholder:text-slate-400 md:placeholder:text-[18px] bg-white border-none rounded-md py-2 pl-3 md:pl-9 pr-3 focus:outline-none text-[14px] md:text-md w-1/2 md:w-full"
                            />
                            <select
                                value={selectedAuthor}
                                onChange={handleAuthorChange}
                                className="p-2 border rounded md:text-[14px] text-[8px] md:text-md"
                            >
                                <option value="">Select Translator</option>
                                {authors.map((author, index) => (
                                    <option key={index} value={author}>
                                        {author}
                                    </option>
                                ))}
                            </select>
                            <button className="bg-[#00A86B] text-white text-[10px] md:text-[16px] font-bold w-12 h-7 p-2 md:w-24 md:h-10" onClick={handleSearchClick}>Search</button>
                        </div>
                    </div>


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
                                    <div>
                                        <p className="text-lg">{ayat.Ayat}</p>
                                        <button
                                            onClick={() => copyToClipboard(ayat.Ayat)}
                                        >
                                            <MdOutlineContentCopy />
                                        </button>
                                    </div>
                                    {/* <p className="text-gray-600">{ayat.AyatNoAraab}</p> */}
                                    <div>
                                        <p className="text-gray-600">{ayat.MuftiTaqiUsmani}</p>
                                        {/* <button onClick={() => copyAyatToClipboard(ayat.MuftiTaqiUsmani)}><MdOutlineContentCopy /></button> */}
                                        <button onClick={() => copyAyatToClipboard([ayat.MuftiTaqiUsmani, ayat.DrMohsinKhan, ayat.MehmoodulHassan, ayat.FatehMuhammadJalandhri])}>
            <MdOutlineContentCopy />
          </button>
                                    </div>
                                    <div>
                                    <p className="text-gray-600">{ayat.DrMohsinKhan}</p>
                                    {/* <button onClick={() => copyAyatToClipboard(ayat.DrMohsinKhan)}><MdOutlineContentCopy /></button> */}
                                    </div>
                                    <div>
                                    <p className="text-gray-600">{ayat.MehmoodulHassan}</p>
                                    {/* <button onClick={() => copyAyatToClipboard(ayat.MehmoodulHassan)}><MdOutlineContentCopy /></button> */}
                                    </div>
                                    <div>
                                    <p className="text-gray-600">{ayat.FatehMuhammadJalandhri}</p>
                                    {/* <button onClick={() => copyAyatToClipboard(ayat.FatehMuhammadJalandhri)}><MdOutlineContentCopy /></button> */}
                                    </div>

                                    <p className="text-gray-600">{ayat.TarjumaLafziFahmulQuran}</p>
                                    <p className="text-gray-600">{ayat.TarjumaLafziNazarAhmad}</p>
                                </div>
                            ))}
                        </div>
                    </Draggable>
                ) : (
                    <Draggable>

                        {/* <div className="text-center text-red-500 absolute top-0 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-lg w-80 max-h-80 overflow-y-auto">
                            No result found
                        </div> */}
                        <div></div>
                    </Draggable>
                )}
            </div>
            <div className='flex items-center justify-center'>
                {toggle && <VirtualKeyboard onKeyPress={handleInputChange} />}

            </div>



        </>
    )
}

const mapStateToProps = (state) => ({
    ayatData: state.search.results,
});

const mapDispatchToProps = (dispatch) => ({
    searchQuran: (query, author) => dispatch(searchQuran(query, author)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
