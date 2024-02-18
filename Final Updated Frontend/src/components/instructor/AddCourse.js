import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addCourse} from '../../redux/actions/course'
import Button from '../button/Button';
import { Link } from 'react-router-dom';

const AddCourse = ({ addCourse }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCourse({ name,description });
    setName('');
    setDescription('');
  };

  return (
   
    <div className='relative'>

    <section className="flex flex-col w-full">
      <div className='flex flex-col max-w-[1240] items-center gap-8 mt-6'>
    <h1 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold'>Add Course</h1>
    {/* <h1 className="font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold">How About a Working Title?</h1> */}
    {/* <p className="lead">
      <i className="fas fa-user" /> Create Your Course Now
    </p> */}
    <div className='w-1/3 justify-center'>
      {/* <div className='bg-primary p'>
        <h3>Add Course...</h3>
      </div> */}
      <form
        className='flex flex-col gap-4 mt-12 justify-center'
       
        >
                      <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Title</h3>

        <textarea
        className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
          name='text'
          cols='10'
          rows='1'
          placeholder='How About a Working Title?'
          value={name}
          onChange={e => setName(e.target.value)}
          required
          />
        {/* <h1 className="font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold">How About a Working Title?</h1> */}
        <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Description</h3>

        <textarea
        className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
        name='text'
        cols='30'
        rows='5'
        placeholder='Add Description'
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        />
        {/* <input type='submit' className='btn btn-dark my-1' value='Submit' /> */}
        {/* <Button type='submit' name='Submit' value='Submit'/> */}
      </form>
    </div>
          </div>
    </section>
     <div className='flex flex-row border sticky bottom-0 mt-44 bg-white justify-between shadow-md transform origin-top h-20 p-6'>

     {/* <div className='flex flex-row'> */}

     {/* <input type="submit" className="btn btn-primary my-1" /> */}

     <Link className="" to="/instructorDashboard">
       <Button name='Previous' />
     </Link>
     <button type="button" onClick={handleFormSubmit}>

       <Button name='Submit' />

     </button>
     {/* </div> */}
</div>
   </div>
  );
};

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired
};

export default connect(null,{ addCourse }
)(AddCourse);
