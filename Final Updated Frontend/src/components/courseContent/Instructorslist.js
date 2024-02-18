import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchInstructors,fetchCourseContentByIdInstructor, shareCourseContent } from '../../redux/actions/instructorCourseContent';
import { useNavigate } from 'react-router-dom';

const Instructorlist = ({ fetchInstructors, shareCourseContent, instructors, loading, error, courseContent, instructorId }) => {
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const contentId = courseContent._id;
  const navigate = useNavigate();
  const popupRef = useRef(null);

  console.log("id", courseContent._id)

  const handleOutsideClick = (event) => {
    console.log('Clicked outside the component');
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      // If user clicks outside of the popup, redirect back
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchInstructors();
    

    // Add event listener to handle outside clicks
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      // Remove the event listener when the component is unmounted
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [fetchInstructors,navigate]);

  const handleInstructorClick = (instructor) => {
    const isSelected = selectedInstructors.some((selected) => selected._id === instructor._id);

    if (isSelected) {
      // If instructor is already selected, remove from the list
      setSelectedInstructors(selectedInstructors.filter((selected) => selected._id !== instructor._id));
    } else {
      // If instructor is not selected, add to the list
      setSelectedInstructors([...selectedInstructors, instructor]);
    }
  };

  return (
    <div ref={popupRef} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Select an Instructor</h2>
        {loading && <div className="text-gray-600">Loading...</div>}
        {error && <div className="text-red-600">Error: {error}</div>}
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className={`cursor-pointer p-2 mb-2 rounded-lg hover:bg-gray-100 ${selectedInstructors.some(selected => selected._id === instructor._id) ? 'bg-blue-200' : ''
              }`}
            onClick={() => handleInstructorClick(instructor)}
          >
            {instructor.firstName} {instructor.lastName}
          </div>
        ))}

        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            if (selectedInstructors.length > 0) {
              const instructorIds = selectedInstructors.map((instructor) => instructor._id);
              // Call shareCourseContent action with courseId and an array of instructorIds
              // console.log("Content ID:", contentId);
              // console.log("Instructor IDs:", instructorIds);
              shareCourseContent(contentId, instructorIds);

              // Close the popup or perform any other actions as needed
              navigate(-1);
            }
          }}
        >
          Share with Selected Instructors
        </button>
        <button onClick={() => navigate(-1)}>Go Back</button>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courseContent: state.courseContent.courseContent,
  instructors: state.courseContent.instructors,
  loading: state.courseContent.loading,
  error: state.courseContent.error,
});

export default connect(mapStateToProps, { fetchInstructors, shareCourseContent })(Instructorlist);
