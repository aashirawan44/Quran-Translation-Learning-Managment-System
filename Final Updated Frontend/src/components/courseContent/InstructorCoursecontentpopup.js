import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCourseContentByIdInstructor, downloadCoursecontent } from '../../redux/actions/instructorCourseContent';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const InstructorCoursecontentpopup = ({ fetchCourseContentByIdInstructor, downloadCoursecontent, courseContent, loading, error }) => {
    const { contentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourseContentByIdInstructor(contentId);
    }, [fetchCourseContentByIdInstructor, contentId]);

    const handleDownload = (contentId) => {
        downloadCoursecontent(contentId);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    {loading && <div className="text-gray-600">Loading...</div>}
    {error && <div className="text-red-600">Error: {error}</div>}

    return (
        <div className="flex items-center justify-center bg-gray-100">

          

            {courseContent && (
                <div className="bg-white rounded-lg shadow-md p-8 w-1/2 m-4">
                  
                        <FaArrowLeft size={24} color="#333" onClick={handleGoBack}/>
                   
                    <h1 className="text-2xl font-semibold mb-4">{courseContent.title}</h1>
                    <p className="text-gray-600 mb-4">{courseContent.description}</p>

                    <div className="flex mt-4 gap-4">
                        <button
                            onClick={() => handleDownload(courseContent._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Download
                        </button>

                        <Link to="/instructorlist">
                            <button

                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Share
                            </button>
                        </Link>
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

export default connect(mapStateToProps, { fetchCourseContentByIdInstructor, downloadCoursecontent })(InstructorCoursecontentpopup);
