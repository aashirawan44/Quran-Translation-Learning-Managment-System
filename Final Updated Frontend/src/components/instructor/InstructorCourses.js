import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getInstructorCourses, deleteCourse } from '../../redux/actions/course';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from "../button/Button";
import './course.css';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const truncateString = (str, maxLength) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
};

const InstructorCourses = ({ courses, getInstructorCourses, profilePicture, deleteCourse }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const handleDropdownToggle = (courseId) => {
    // Toggle dropdown visibility and set the selected comment
    setIsDropdownVisible(!isDropdownVisible);
    setSelectedCourseId(selectedCourseId === courseId ? null : courseId)
    // setSelectedComment(comment);
  };

  const handleDelete = (courseId) => {
    deleteCourse(courseId);
    getInstructorCourses();
  };

  useEffect(() => {
    getInstructorCourses();
  }, [getInstructorCourses]);

  const colors = ['#ffedcc', '#d4f6ed', '#e3dbfa', '#dff3fe'];
  let colorIndex = 0;

  return (
    <div className='flex flex-col w-full items-center gap-8'>
      <h2 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold mt-4'>Courses</h2>
      {courses.length === 0 && <p>No courses found. Kindly create one in the Add Course section.</p>}
      <div className="flex justify-center flex-wrap gap-4 w-2/3">
        {courses.length > 0 &&
          courses.map((course) => {
            const bgColor = colors[colorIndex % colors.length];
            colorIndex++;

            const courseStyles = {
              backgroundColor: bgColor,
            };

            return (
              <div className="flex flex-col border-2 border-slate-300 bg-gray-50 drop-shadow-md rounded-lg w-80 h-80 p-2">
                <div style={courseStyles} className={`flex flex-row p-1 justify-between rounded-lg h-64`}>
                  <Link to={`/instructorcourses/${course._id}/announcements`} key={course._id}>
                    <div className="group cursor-pointer">
                      <h3 className='font-sans text-start text-[#111827] text-xl font-bold px-6 mt-6 transition duration-300 transform hover:translate-y-1 hover:border-b'>
                        {truncateString(course.name, 50)}
                      </h3>
                      <p className='font-sans text-start text-sm text-[#111827] font-semibold px-6'>
                        by {truncateString(course.instructorName, 15)}
                      </p>
                      <p className='font-sans text-start text-sm px-6'>{truncateString(course.description, 50)}</p>
                    </div>
                  </Link>
                  <div className='flex flex-col mt-6 z-50'>
                    <BiDotsVerticalRounded onClick={() => handleDropdownToggle(course._id)} className='cursor-pointer' />

                    {/* Dropdown menu */}
                    </div>
                    {isDropdownVisible && selectedCourseId == course._id && (
                      <div className='fixed ml-56 mt-12 bg-white rounded-md shadow-lg'>
                        <button className='p-2 text-gray-800 hover:bg-gray-100 ' onClick={() => handleDelete(course._id)}>
                          Delete
                        </button>
                        <div className='p-2 text-gray-800 hover:bg-gray-100'>
                          Edit
                        </div>
                      </div>
                    )}
                </div>
                {/* <button className='bg-gray-700 rounded-full p-2 text-white text-sm mt-2 w-1/3 ml-48'>Read more</button> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

InstructorCourses.propTypes = {
  getInstructorCourses: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  profilePicture: state.profile.profile?.user?.profilepicture,
});

export default connect(mapStateToProps, { getInstructorCourses, deleteCourse })(InstructorCourses);
