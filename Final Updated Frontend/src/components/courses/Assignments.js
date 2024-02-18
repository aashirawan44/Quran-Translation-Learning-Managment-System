import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAssignments, downloadAssignment } from '../../redux/actions/assignment';
import { uploadSolution } from '../../redux/actions/submission';
import InstructorSecondaryHeader from '../instructor/InstructorSecondaryHeader';
import { Link,useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CgSoftwareDownload } from 'react-icons/cg'
import { MdAssignment } from 'react-icons/md'
import Button from '../button/Button';


const Assignments = ({ assignments, error, getAssignments, downloadAssignment, uploadSolution }) => {
  const { courseid } = useParams();
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (courseid) {
      getAssignments(courseid);
      // console.log(auth.token);
    }
  }, [getAssignments, courseid]);

  const handleDownload = (assignmentId) => {
    downloadAssignment(courseid, assignmentId);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (assignmentId) => {

    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadSolution(courseid, assignmentId, formData, auth.token);
      console.log(auth.token);
      console.log(file);
       setFile(null);
       setUploadError(null);
      getAssignments(courseid);
      // Reload assignments to show updated status
    } catch (error) {
      setUploadError(error.response.data.message);
    }

  };

  return (
    <>
      {/* <InstructorSecondaryHeader /> */}
      <div className='flex justify-center items-center'>

        <div className='flex flex-col w-3/4 items-center'>
          {/* <h2 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold'>Assignments</h2> */}
          {error && <p>{error.msg}</p>}
          {!Array.isArray(assignments) || assignments.length === 0 ? (
            <p>No assignments uploaded.</p>
          ) : (
            assignments &&
            assignments.map((assignment) => (
              <div key={assignment._id} className='w-3/4 mt-4'>
              
                <div className='mt-4'>
                  <Link to={`/courses/${courseid}/${assignment._id}/assignment`}>
                  <p className='font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-semibold'>{assignment.title}</p>
                  </Link>
                </div>
                
                  <div className='flex border items-center mt-8 w-full h-20 rounded-lg justify-between p-6' key={assignment._id}>
                    <div className='flex flex-row gap-4'>

                      <MdAssignment className='w-6 h-6 text-[#00A86B]' />
                      <div className=''>{assignment.file}</div>
                    </div>
                    <button onClick={() => handleDownload(assignment._id)}><CgSoftwareDownload className='w-6 h-6' /></button>
                  </div>
                  {/* <div className='flex flex-col border h-20 mt-8'>
                    <input className='border' type="file" onChange={handleFileChange} />
                    <button className='border mt-4 h-8' onClick={() => handleUpload(assignment._id)}>
                      Submit
                    </button>
                    {uploadError && <p>{uploadError}</p>}
                  </div> */}
                </div>
             
            ))
          )}
        </div>
      </div>
    </>
  );
};

Assignments.propTypes = {
  getAssignments: PropTypes.func.isRequired,
  downloadAssignment: PropTypes.func.isRequired,
  uploadSolution: PropTypes.func.isRequired,
  assignments: PropTypes.array.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  assignments: state.assignment.assignments || [],
  error: state.assignment.error,
});

export default connect(mapStateToProps, { getAssignments, downloadAssignment, uploadSolution })(Assignments);
