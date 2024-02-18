import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const VirtualKeyboard = ({ onKeyPress }) => {
  const handleClick = (value) => {
    onKeyPress(value);
  };

  const handleSpace = () => {
    onKeyPress(' ');
  };

  return (
    <div className='flex justify-center mt-8'>
      <div className='w-full md:w-1/2 h-auto bg-gray-400 absolute z-30'>
        <div className='mt-px'>
          <button className='flex justify-center items-center w-12 h-12 bg-white'>
            <AiOutlineClose />
          </button>
        </div>
        <div className='mt-2 flex flex-row p-2'>
          {/* Buttons for the first row */}
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ض')}>
            ض
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ص')}>
            ص
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ث')}>
            ث
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ق')}>
            ق
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ف')}>
            ف
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('غ')}>
            غ
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ع')}>
            ع
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ه')}>
            ه
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('خ')}>
            خ
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ح')}>
            ح
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ج')}>
            ج
          </button>
          <button className='w-1/6 h-12 text-xs bg-white gap-2.5 m-px' onClick={() => handleClick('Backspace')}>
            Backspace
          </button>
        </div>
        <div className='mt-2 flex flex-row p-2'>
          {/* Buttons for the second row */}
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ش')}>
            ش
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('س')}>
            س
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ي')}>
            ي
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ب')}>
            ب
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ل')}>
            ل
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ا')}>
            ا
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ت')}>
            ت
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ن')}>
            ن
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('م')}>
            م
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ك')}>
            ك
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ط')}>
            ط
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 text-xs bg-white gap-2.5 m-px'>Enter</button>
        </div>
        <div className='mt-2 flex flex-row p-2'>
          {/* Buttons for the third row */}
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ذ')}>
            ذ
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ئ')}>
            ئ
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ء')}>
            ء
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ؤ')}>
            ؤ
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ر')}>
            ر
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('لا')}>
            لا
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ى')}>
            ى
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ة')}>
            ة
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('د')}>
          د
          </button>
          
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('و')}>
            و
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ز')}>
            ز
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 bg-white gap-2.5 m-px' onClick={() => handleClick('ظ')}>
            ظ
          </button>
          <button className='w-1/6 md:w-1/12 lg:w-1/24 h-12 text-xs bg-white gap-2.5 m-px'>Shift</button>
        </div>
        <div className='mt-2'>
          <button className='w-96 h-12 bg-white gap-2.5 m-px' onClick={handleSpace}>
            Space
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
