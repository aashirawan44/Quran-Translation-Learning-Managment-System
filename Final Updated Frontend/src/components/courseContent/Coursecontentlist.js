import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchCourseContent, fetchCourseContentById } from "../../redux/actions/coursecontentActions"
import { Link, useParams } from 'react-router-dom'





const Coursecontentlist = ({ fetchCourseContent, courseContents, fetchCourseContentById, courseContent, loading, error }) => {
  const { courseid } = useParams();
  useEffect(() => {
    fetchCourseContent(courseid);
  }, [fetchCourseContent, courseid])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCourseLinkClick = (contentId) => {
    fetchCourseContentById(contentId);
    // console.log("Handle Cliked",contentId);
  };

  // console.log(courseContents);
  return (

    <div className='flex flex-col gap-2 justify-center items-center'>

     
      {courseContents && courseContents.map((course) => (

        <Link
          to={`/courseContent/${course._id}`}
          className="flex flex-col text-start block px-4 w-1/2 py-2 bg-[#DEF7EC] hover:bg-green-600 text-[#03543f] hover:text-white rounded-lg"
          onClick={() => handleCourseLinkClick(course._id)}
        >
          {/* <MdQuiz className='w-8 h-8'/> */}
          <div key={course.id}>{course.title}</div>
        </Link>

      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  courseContents: state.courseContent.courseContents,
  loading: state.courseContent.loading,
  error: state.courseContent.error,
});

export default connect(mapStateToProps, { fetchCourseContent, fetchCourseContentById })(Coursecontentlist);