import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCourses } from '../../redux/actions/course';
import { enrollCourse } from '../../redux/actions/enrollment';
import PropTypes from 'prop-types';
// import Button from '../button/Button'

import Card from 'react-bootstrap/Card';
import Button from '../button/Button';

const Courses = ({ courses, getCourses, enrollCourse }) => {
  useEffect(() => {
    getCourses();
    // Fetch course details here
  }, [getCourses]);

  console.log(courses)

  const handleEnroll = (courseId) => {
    enrollCourse(courseId);
  }

  return (
    <div className='flex flex-col w-full justify-center items-center gap-8'>
      <h2 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold mt-2'>Courses</h2>
      <div className='mx-auto w-2/3'>
        {Array.isArray(courses) && courses.length > 0 ? (
          <div className="flex justify-center flex-wrap gap-8 w-full">
            {courses.map((course) => (
              <div key={course._id} className="flex flex-col justify-between border-2 border-slate-400 rounded-lg w-64 h-64">
                <div className="mini">
                  <div>
                    <div className='font-sans leading-2 text-start tracking-wide text-xl text-white font-semibold px-4 mt-2'>{course.name}</div>
                    <div className='font-sans leading-2 text-start tracking-wide text-sm text-white px-4 mt-2'>By: {course.instructorName}</div>
                    <div className='font-sans text-start tracking-wide text-sm text-white font-semibold px-4'>{course.description.length > 85
                      ? `${course.description.substring(0, 85)}...`
                      : course.description}</div>
                  </div>
                </div>
                <button className='h-10 rounded bg-[#DEF7EC] hover:bg-green-600 text-[#03543f] hover:text-white' onClick={() => handleEnroll(course._id)}>
                  Enroll
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p> // You can replace this with a loading spinner or any other loading indicator
        )}
      </div>
    </div>
  );
};

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  courses: PropTypes.array,
  enrollCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.course.courses || [], // Provide a default empty array
});

export default connect(mapStateToProps, { getCourses, enrollCourse })(Courses);