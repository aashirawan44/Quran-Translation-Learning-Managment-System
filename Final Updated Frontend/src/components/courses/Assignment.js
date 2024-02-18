import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAssignment, getAssignments, downloadAssignment } from '../../redux/actions/assignment';
import { uploadSolution } from '../../redux/actions/submission';
import InstructorSecondaryHeader from '../instructor/InstructorSecondaryHeader';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { CgSoftwareDownload } from 'react-icons/cg'
import { MdAssignment } from 'react-icons/md'
import Button from '../button/Button';

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

const Assignment = ({ assignment, error, getAssignments, getAssignment, downloadAssignment, uploadSolution }) => {
    const { assignmentid, courseid } = useParams();
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Assignment")
        if (assignmentid) {
            getAssignment(assignmentid);
            // console.log(auth.token);
        }
    }, [getAssignment, assignmentid]);

    // const handleDownload = (assignmentId) => {
    //     downloadAssignment(courseid, assignmentId);
    // };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {

        try {
            const formData = new FormData();
            formData.append('file', file);
            await uploadSolution(courseid, assignmentid, formData);
            console.log(auth.token);
            console.log(file);
            setFile(null);
            setUploadError(null);
            getAssignment(assignmentid);
            // Reload assignments to show updated status
            // window.location.reload();
        } catch (error) {
            setUploadError(error.response.data.message);
        }

    };

    const isoDate = assignment.dueDate;
    const formattedDate = formatDate(isoDate);
    // console.log(formattedDate)

    const assignmentStatus = assignment.status;



    return (
        <>
            {/* <InstructorSecondaryHeader /> */}
            <div className='flex justify-center'>

                <div className='flex w-11/12'>

                    <div className='flex flex-col w-3/4 ml-48'>
                        {/* <h2 className='font-sans leading-4 text-start tracking-wider text-4xl text-[#111827] font-bold'>Assignments</h2> */}
                        {error && <p>{error}</p>}


                        <div key={assignment._id} className='mt-4'>

                            <div className='flex flex-col mt-4'>
                                <div className='flex flex-row justify-between'>
                                    <div className='flex flex-row gap-4'>


                                        <MdAssignment className='w-10 h-10 p-1 rounded-full text-white bg-[#00A86B]' />
                                        <p className='font-sans leading-2 text-start tracking-wide text-3xl text-[#111827] font-semibold'>{assignment.title}</p>
                                    </div>
                                    <p className='font-sans tracking-wide text-sm text-gray-600 font-semibold mr-14 mt-2'>Due {formattedDate}</p>



                                </div>

                                <p className='font-sans text-start ml-14 text-base text-gray-500 font-normal mt-1'></p>

                            </div>
                            <div className='w-11/12 mt-6 h-px bg-[#00A86B] ml-10'>

                            </div>
                            <div className='flex flex-row justify-center' key={assignment._id}>
                                <div className='flex border items-center mt-8 w-11/12 rounded-lg justify-between p-6'>
                                    <div className=''>
                                        <div className='flex flex-row gap-4 mt-4'>

                                            <MdAssignment className='w-6 h-6 text-[#00A86B]' />
                                            <div className=''>{assignment.file}</div>
                                            <button><CgSoftwareDownload className='w-6 h-6' /></button>
                                        </div>

                                        <p className='font-sans text-start ml-14 text-base text-gray-700 font-normal mt-1'>{assignment.description}</p>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>


                    </div>

                    <div className='flex flex-col border h-40 w-1/4 rounded-lg shadow-md'>
                        <p className='font-sans text-start tracking-wide text-xl text-gray-700 font-lg p-2 px-8'>Your Work</p>
                        <div className='flex flex-col gap-2 items-center justify-center'>

                            {assignmentStatus === "Not Submitted" ? (
                                <label className='border w-3/4 rounded-md p-2 flex items-center justify-center cursor-pointer'>

                                    {file ? (
                                        <span className='text-[#00A86B] text-sm font-normal'>{file.name}</span>
                                    ) : (
                                        <span className='text-[#00A86B] text-sm font-normal'>+ Add Work</span>
                                    )}


                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            ) : (
                                <label className='border w-3/4 rounded-md p-2 flex items-center justify-center cursor-pointer mt-6'>
                                    <span className='text-[#00A86B] text-sm font-normal'>Your work Submitted!</span>

                                </label>
                            )}

                            {assignmentStatus === "Not Submitted" && (
                                <button className='border rounded-md bg-[#00A86B] text-white p-2 w-3/4' onClick={() => handleUpload()}>
                                    Submit
                                </button>
                            )}
                        </div>
                        {uploadError && <p>{uploadError}</p>}
                    </div>

                </div>
            </div>
        </>
    );
};

Assignment.propTypes = {
    getAssignment: PropTypes.func.isRequired,
    downloadAssignment: PropTypes.func.isRequired,
    uploadSolution: PropTypes.func.isRequired,
    assignment: PropTypes.array.isRequired,
    error: PropTypes.string,
};

const mapStateToProps = (state) => ({
    assignment: state.assignment.assignment || [],
    error: state.assignment.error,
});

export default connect(mapStateToProps, { getAssignment, downloadAssignment, uploadSolution })(Assignment);
