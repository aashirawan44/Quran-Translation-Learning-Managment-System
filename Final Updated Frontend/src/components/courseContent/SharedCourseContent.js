// SharedCourseContent.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSharedCourseContent, downloadCoursecontent } from '../../redux/actions/coursecontentActions'; // Import the action

const SharedCourseContent = ({ sharedCourseContent, fetchSharedCourseContent, downloadCoursecontent }) => {
  useEffect(() => {
    // Fetch shared course content when the component mounts
    fetchSharedCourseContent();
  }, [fetchSharedCourseContent]);

  const handleDownload = (contentId) => {
    // Trigger the download action when the download link is clicked
    downloadCoursecontent(contentId);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Shared Course Content</h1>

      {sharedCourseContent.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4">
          {sharedCourseContent.map((content) => (
            <li key={content._id} className="border p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-2">{content.title}</h2>
              <p className="text-gray-600 mb-4">{content.description}</p>
              <p className="text-gray-500">Shared by: {content.createdBy.firstName}</p>
              {/* You can add more information as needed */}
              <button
                onClick={() => handleDownload(content._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No shared course content available.</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sharedCourseContent: state.courseContent.sharedCourseContent,
});

export default connect(mapStateToProps, { fetchSharedCourseContent, downloadCoursecontent })(SharedCourseContent);
