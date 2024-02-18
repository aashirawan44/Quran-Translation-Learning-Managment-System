import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getEnrolledCourses } from '../../redux/actions/enrollment';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const EnrolledCourses = ({ enrollments, loading, getEnrolledCourses }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getEnrolledCourses();
      } catch (error) {
        // Handle the error gracefully
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchData();
  }, [getEnrolledCourses]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if enrollments is an array and has at least one item
  if (!Array.isArray(enrollments) || enrollments.length === 0) {
    return <p>No enrolled courses available.</p>;
  }

  return (
    <div className='flex flex-col w-full items-center gap-8'>
      <h2 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold'>
        Courses
      </h2>
      <div className='flex justify-center flex-wrap gap-4 w-2/3'>
        {enrollments.map((course) => (
          <Link to={`/courses/${course._id}/announcements`} key={course._id}>
            <div className='flex flex-col border-2 border-slate-300 rounded-lg w-64 h-64'>
              <div className='mini'>
                <h3 className='font-sans leading-2 text-start tracking-wide text-xl text-white font-semibold px-4 mt-2'>
                  {course.name}
                </h3>
                <div className='font-sans leading-2 text-start tracking-wide text-sm text-white px-4 mt-2'>By: {course.instructorName}</div>
                <p className='font-sans text-start tracking-wide text-sm text-white font-semibold px-4'>
                  {course.description && course.description.length > 85
                    ? `${course.description.substring(0, 85)}...`
                    : course.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

EnrolledCourses.propTypes = {
  getEnrolledCourses: PropTypes.func.isRequired,
  enrollments: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  enrollments: state.enrollment.enrollments,
  loading: state.enrollment.loading,
});

export default connect(mapStateToProps, { getEnrolledCourses })(EnrolledCourses);