import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCourseContentById, downloadCoursecontent } from '../../redux/actions/coursecontentActions';
import { useParams } from 'react-router-dom';

const Coursecontentlist = ({ fetchCourseContentById, downloadCoursecontent, courseContent, loading, error }) => {
  const { contentId } = useParams();

  useEffect(() => {
    fetchCourseContentById(contentId);
  }, [fetchCourseContentById, contentId]);

  const handleDownload = (contentId) => {
    downloadCoursecontent(contentId);
  };

  {loading && <div className="text-gray-600">Loading...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 m-2">
      

      {courseContent && (
        <div className="bg-white rounded-lg shadow-md p-8 w-1/2 mt-2">
          <h1 className="text-2xl font-semibold mb-4">{courseContent.title}</h1>
          <p className="text-gray-600 mb-4">{courseContent.description}</p>
          
          <div className="mt-4">
            <button
              onClick={() => handleDownload(courseContent._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  courseContent: state.courseContent.courseContent,
  loading: state.courseContent.loading,
  error: state.courseContent.error,
});

export default connect(mapStateToProps, { fetchCourseContentById, downloadCoursecontent })(Coursecontentlist);
