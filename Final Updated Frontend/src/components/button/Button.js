import React from 'react'

const Button = ( props ) => {
  return (
    <div className=' flex justify-center w-30 h-10'>
        <button className='flex justify-center items-center w-full p-4 bg-[#00cc81] text-white rounded'>{props.name}</button>
    </div>
  )
}

export default Button