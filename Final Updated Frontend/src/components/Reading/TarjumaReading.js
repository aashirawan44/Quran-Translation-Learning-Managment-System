import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header'
// import SIdebar from '../Sidebar/SIdebar'
// import Dropdown from '../Dropdown/Dropdown'
import { useEffect } from 'react'
import Button from '../button/Button'
import '../../constants/fonts.css'
// import { BsDatabaseExclamation } from 'react-icons/bs'
import Dropdowns from '../Dropdown/TarjumaDropdowns'
import Dropdown from '../Dropdown/Dropdown'
import InstructorNavbar from '../instructor/InstructorNavbar';
import WordMeaningDropdown from './WordMeaningDropdown';

const TarjumaReading = () => {

    const [surahRea, setSurahRea] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState('TarjumaLafziDrFarhatHashmi');
    const [selectedSurahNumber, setSelectedSurahNumber] = useState("");
    const [selectedSurahName, setSelectedSurahName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const [selectedAyatIndex, setSelectedAyatIndex] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const surahNumber = queryParams.get('surahNumber');
        // const surahName = queryParams.get('surahName');
        setSelectedSurahNumber(Number(surahNumber));
        // setSelectedSurahName(`سُورَةُ ${surahName}`);
    }, [location]);

    useEffect(() => {
        setIsLoading(true); // Start loading
        fetch(`http://localhost:5000/api/quran/surah/${selectedSurahNumber}/turjma/${selectedAuthor}`)
            .then((res) => res.json())
            .then((data) => {
                setSurahRea(data);
                console.log(data);
                setIsLoading(false); // Stop loading
            });
    }, [selectedSurahNumber, selectedAuthor]);

    const handleAuthorSelect = (authorName) => {
        setSelectedAuthor(authorName);


    };

    const handleAyatClick = (index) => {
        setSelectedAyatIndex(index);
    };

    const closeDropdown = () => {
        setSelectedAyatIndex(null);
    };

    const handleSurahSelect = (surahNumber, surahName) => {
        setSelectedSurahNumber(surahNumber);
        setSelectedSurahName(surahName);
    };

    return (

        <>
            <InstructorNavbar />
            <Header />
            <div className='flex justify-center'>
                {/* <SIdebar /> */}
                <div className='flex hidden md:block w-1/6 sticky top-0 h-screen bg-white shadow-lg mr-44'>

                    <Dropdown onSurahSelect={handleSurahSelect} />
                </div>

                <div className='flex flex-col w-4/6 mt-10'>
                    <Dropdowns onAuthorSelect={handleAuthorSelect} />

                    <div className='flex justify-center items-center mt-6'>
                        <span className="font-[CustomFontName] text-4xl">{selectedSurahName}</span>
                    </div>
                    <div className='flex w-full bg-white mt-10'>

                        <div className='flex flex-col w-full bg-white mt-10 md:flex-row md:items-center md:justify-between'>
                            <div className='mb-4 md:mb-0 md:mr-4'>
                                <span className='text-base md:text-lg'>{`Translation By ${selectedAuthor}`}</span>
                            </div>
                        </div>


                    </div>

                    {isLoading ? ( // Show loading state while fetching data
                        <div className="flex justify-center items-center w-full h-40">
                            <span className="text-gray-500">Loading...</span>
                        </div>
                    ) : (


                        surahRea?.ayahs.map((surahnum, index) => (
                            <div className='flex flex-col justify-center items-center w-fullS bg-white shadow-md mt-10 border border-gray-200'>

                                <p className='m-8 leading-[3rem] font-[CustomFontName] text-3xl tracking-wide'  onClick={() => handleAyatClick(index)}>
                                    {
                                        surahnum.AyatNew
                                    }
                                </p>
                                <div className='flex justify-center items-center flex-row w-full '>
                                    <div className='w-1/3 h-px bg-gray-200'>

                                    </div>
                                    <div className='m-2'>
                                        {surahnum.ayahNo}
                                    </div>
                                    <div className='w-1/3 h-px bg-gray-200'>

                                    </div>
                                </div>
                                <div className=''>
                                    {/* {selectedAyatIndex === index && (
                                        )} */}
                                        <WordMeaningDropdown wordsAndMeanings={surahnum.translation}/>
                                    
                                </div>
                            </div>
                        ))
                        //     :
                        //     "Loading..."
                        // } 
                    )}


                    <div className='flex justify-between items-center w-full mt-20 '>
                        <Button name="Previous" />
                        <Button name="Next Surah" />
                    </div>


                </div>

            </div>
        </>
    )
}

export default TarjumaReading