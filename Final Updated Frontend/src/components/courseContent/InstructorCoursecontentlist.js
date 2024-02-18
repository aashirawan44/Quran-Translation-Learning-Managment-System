import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux';
import { fetchCourseContentByInstructor,fetchCourseContentByIdInstructor,deleteCourseContent } from "../../redux/actions/instructorCourseContent"
import { Link,useParams } from 'react-router-dom'
import {AiOutlinePlus} from 'react-icons/ai'
import {AiOutlineDelete} from 'react-icons/ai'



const InstructorCoursecontentlist = ({ fetchCourseContentByInstructor, courseContents,fetchCourseContentByIdInstructor, courseContent,deleteCourseContent, loading, error }) => {
  const { courseid } = useParams();
  const [selectedContentId, setSelectedContentId] = useState(null);
  useEffect(() => {
    fetchCourseContentByInstructor(courseid);
  }, [fetchCourseContentByInstructor, courseid])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCourseLinkClick = (contentId) => {
    fetchCourseContentByIdInstructor(contentId);
    // console.log("Handle Cliked",contentId);
};

const handleDelete = (contentId) => {
  setSelectedContentId(contentId);
  // Call the delete action here
  deleteCourseContent(contentId);

  fetchCourseContentByInstructor(courseid);
};
  // console.log(courseContents);
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
       <Link  to={`/courses/${courseid}/UploadCourseContent`} className="flex flex-row gap-2 mt-2">
         <AiOutlinePlus className='w-6 h-6'/>
          <div>Add Course Content</div>
        </Link>
      {courseContents && courseContents.map((course) => (
        <>

        <div  className="flex flex-row justify-between text-start block px-4 w-1/2 py-2 bg-[#DEF7EC] hover:bg-green-600 text-[#03543f] hover:text-white rounded-lg">


        <Link
          to={`/instructorcourseContent/${course._id}`}
         
          onClick={() => handleCourseLinkClick(course._id)}
          >
          {/* <MdQuiz className='w-8 h-8'/> */}
          <div key={course.id} className='md:text-xl text-sm'>{course.title}</div>
        </Link>

          <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(course._id)}>
          <AiOutlineDelete />
        </button>
        
            </div>
         
          </>

      ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  courseContents: state.courseContent.courseContents,
  loading: state.courseContent.loading,
  error: state.courseContent.error,
});

export default connect(mapStateToProps, { fetchCourseContentByInstructor,fetchCourseContentByIdInstructor,deleteCourseContent })(InstructorCoursecontentlist);