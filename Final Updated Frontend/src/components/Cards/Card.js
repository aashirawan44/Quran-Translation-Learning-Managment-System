import React from 'react'
import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
// import './card.css'
import '../../constants/fonts.css'

const Card = () => {
   const [quransurah, setQuranSurah] = useState(null);
   
   useEffect(() => {
      fetch("http://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
         // console.log(data)
         setQuranSurah(data);
      });
      // fetchData();
   },[]);
   
   return (
   
<> 
   {
      quransurah ?
      <div className="flex justify-center lg:container mx-10 py-24">
      
     
         <div className='flex flex-wrap mx-20'>
    { quransurah.data.map((para)=>(
            
        <div className='p-4 md:w-1/2 md:w-1/2 sm:w-4/5 lg:w-1/3'>
         <Link to={{ pathname: '/Reading', search: `?surahNumber=${para.number}` }}>
           <div className='flex items-center justify-between h-20 border border-gray-200 hover:border-gray-300 drop-shadow-lg'>
               <div className='flex items-center gap-4 p-2'>
               <div className='flex items-center justify-center origin-center rotate-45 w-10 h-10 ml-5 bg-[#f4f5f6] hover:bg-[#00cc81]'>
                  <span className='origin-center rotate-[-45deg] text-gray-800 xl:text-sm text-[10px] hover:text-white'>{para.number}</span>
               </div>
               <div className='flex flex-col'>
               <span className='mr-10'>{para.englishName}</span>
               <span className='mr-10 text-gray-400 xl:text-sm text-[10px] font-thin'>{para.englishNameTranslation}</span>
               </div>
               </div>
               <span className='mr-5 font-[CustomFontName] xl:text-sm text-[10px]'>{para.name}</span>
           </div>
               
        </Link>
        </div>
         
         ))
      }
      </div>
         </div>
         :
         "Loading..."
      }
         
       
       </>
         )
      }

export default Card