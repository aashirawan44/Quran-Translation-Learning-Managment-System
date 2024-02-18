import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAssignments, downloadAssignment, deleteAssignment } from '../../redux/actions/assignment';
import { uploadSolution } from '../../redux/actions/submission';
import InstructorSecondaryHeader from '../instructor/InstructorSecondaryHeader';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CgSoftwareDownload } from 'react-icons/cg';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdAssignment } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';  // Import Font Awesome Plus icon

const InstructorCourseAssignments = ({ assignments, error, getAssignments, downloadAssignment, uploadSolution, deleteAssignment }) => {
    const { courseid } = useParams();
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (courseid) {
            getAssignments(courseid);
        }
    }, [getAssignments, courseid]);

    const handleDownload = (assignmentId) => {
        downloadAssignment(courseid, assignmentId);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDelete = (assignmentId) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            deleteAssignment(assignmentId);
            getAssignments(courseid);
        }
    };

    const handleUpload = async (assignmentId) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            await uploadSolution(courseid, assignmentId, formData, auth.token);
            setFile(null);
            setUploadError(null);
            getAssignments(courseid);
        } catch (error) {
            setUploadError(error.response.data.message);
        }
    };

    return (
        <>
            {/* <InstructorSecondaryHeader /> */}
            <div className='flex justify-center items-center space-x-4 mb-4 mt-4'>
                <Link to={`/courses/${courseid}/instructorassignments`}>
                    <button className='bg-green-600 text-white flex items-center px-4 py-2 rounded-full'>
                        <FaPlus className='mr-2' /> Add Assignment
                    </button>
                </Link>
            </div>

            <div className='flex flex-col w-3/4 ml-24'>
                {error && <p>{error}</p>}
                {!Array.isArray(assignments) || assignments.length === 0 ? (
                    <p>No assignments uploaded.</p>
                ) : (
                    assignments &&
                    assignments.map((assignment) => (
                        <div key={assignment._id} className='mt-4'>
                            <div className='mt-4'>
                                <p className='font-sans text-start md:text-2xl text-sm text-[#111827] font-semibold'>{assignment.title}</p>
                            </div>
                            <div className='flex flex-row gap-2' key={assignment._id}>
                                <div className='flex border items-center mt-8 w-3/4 h-20 rounded-lg justify-between p-6'>
                                    <div className='flex flex-row gap-4'>
                                        <MdAssignment className='md:w-6 md:h-6 w-4 h-4 text-[#00A86B]' />
                                        <div className='md:text-xl text-sm '>{assignment.file}</div>
                                    </div>
                                    <button onClick={() => handleDownload(assignment._id)}><CgSoftwareDownload className='md:w-6 md:h-6 h-4 w-4' /></button>
                                    <button onClick={() => handleDelete(assignment._id)}>
                                        <AiOutlineDelete className='md:w-6 md:h-6 h-4 w-4 text-red-600' />
                                    </button>
                                </div>
                                <div className='flex flex-col'>
                                    <Link
                                        to={`/courses/${courseid}/assignments/${assignment._id}/submissions`}
                                        className='bg-green-600 rounded p-2 h-10 text-sm mt-12 md:p-4 md:h-14 md:text-lg md:mt-10 text-white'
                                    >
                                        Submissions
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
             {error && error.msg && (
        <p>Error: {error.msg}</p>
      )}
        </>
    );
};

InstructorCourseAssignments.propTypes = {
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

export default connect(mapStateToProps, { getAssignments, downloadAssignment, uploadSolution, deleteAssignment })(InstructorCourseAssignments);
