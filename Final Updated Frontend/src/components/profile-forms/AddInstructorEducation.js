import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addInstructorEducation } from '../../redux/actions/profile';
import Button from '../button/Button';


const AddInstructorEducation = ({ addInstructorEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    otherDegree: '',
    fieldofstudy: '', // Updated field
    otherField: '', // Added field for other option
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { school, degree,otherDegree, fieldofstudy, otherField, from, to, description, current } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Include otherDegree value if degree is 'Other'
    const finalDegree = degree === 'Other' ? otherDegree : degree;
    // Include otherField value if fieldofstudy is 'Other'
    const finalFieldOfStudy = fieldofstudy === 'Other' ? otherField : fieldofstudy;
    addInstructorEducation({ ...formData, degree: finalDegree, fieldofstudy: finalFieldOfStudy }).then(() =>
      navigate('/instructorDashboard')
    );
  };
  // Options for the Field of Study dropdown
  const fieldOptions = [
    'Computer Science',
    'Architecture',
    'Islam',
    'Phyiology',
    'Literature',
    'Qirat',
    'Other' // Added 'Other' option
  ];

  const degreeOptions = [
    'Matric',
    'Inter',
    'Undergraduate',
    'Graduate',
    'MS',
    'Phd',
    'Dars e Nizami',
    'Qirat Course',
    'Other' // Added 'Other' option
  ];

  return (
    <>
      <div className="relative">

        <section className="flex flex-col items-center w-full">
          <div className='flex flex-col items-start mt-4'>

            <h1 className="font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold">Add Your Education</h1>
            <p className="font-sans text-start text-sm text-gray-400 font-semibold mt-2">
              <i className="fas fa-code-branch" /> Add any Past Education that you
              have attended
            </p>
          </div>
          {/* <small>* = required field</small> */}


          <form
            className="form flex flex-col gap-4 w-1/2 justify-center items-center mt-8"
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   addInstructorEducation(formData).then(() => navigate('/instructorDashboard'));
          // }}
          >
            <div className='flex flex-col w-3/4 gap-2'>

              <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Institute</h3>

              <input
                className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                type="text"
                placeholder="* Institute"
                name="school"
                value={school}
                onChange={onChange}
                required
              />

              <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Degree</h3>

              {/* <input
                className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                type="text"
                placeholder="* Degree or Certificate"
                name="degree"
                value={degree}
                onChange={onChange}
                required
              /> */}

              <select
                className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                name="degree"
                value={degree}
                onChange={onChange}
                required
              >
                {degreeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* Show input field for other degree option */}
              {degree === 'Other' && (
                <input
                  className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                  type="text"
                  placeholder="Other Degree"
                  name="otherDegree"
                  value={otherDegree}
                  onChange={onChange}
                />
              )}


              <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Field of Study</h3>
              <select
                className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={onChange}
                required
              >
                {fieldOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {/* Show input field for other option */}
              {fieldofstudy === 'Other' && (
                <input
                  className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                  type="text"
                  placeholder="Other Field of Study"
                  name="otherField"
                  value={otherField}
                  onChange={onChange}
                />
              )}


              {/* <h4>From Date</h4> */}
              <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>From</h3>

              <input className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none' type="date" name="from" value={from} onChange={onChange} />


              <p>
                <input
                  className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                  type="checkbox"
                  name="current"
                  checked={current}
                  value={current}
                  onChange={() => setFormData({ ...formData, current: !current })}
                />{' '}
                Current School
              </p>


              {/* <h4>To Date</h4> */}
              <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>To</h3>

              <input
                className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                type="date"
                name="to"
                value={to}
                onChange={onChange}
                disabled={current}
              />

              <h3 className='font-sans text-start text-sm text-gray-600 font-bold'>Description</h3>

              <textarea
                className='border-2 border focus:border-[#00cc81] rounded p-2 justify-center outline-none'
                name="description"
                cols="30"
                rows="5"
                placeholder="Program Description"
                value={description}
                onChange={onChange}
              />

            </div>

          </form>

        </section>
        <div className='flex flex-row border sticky bottom-0 bg-white justify-between shadow-md transform origin-top h-20 p-6'>

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
    </>
  );
};

AddInstructorEducation.propTypes = {
  addInstructorEducation: PropTypes.func.isRequired
};

export default connect(null, { addInstructorEducation })(AddInstructorEducation);
