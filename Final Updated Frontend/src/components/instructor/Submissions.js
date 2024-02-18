import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { uploadedSolution, downloadSubmission } from '../../redux/actions/submission';
import { useParams } from 'react-router-dom';
import { CgSoftwareDownload } from 'react-icons/cg';

const Submissions = ({ uploadedSolution, downloadSubmission, assignment, error, loading }) => {
  const { courseid, assignmentid } = useParams();

  useEffect(() => {
    uploadedSolution(courseid, assignmentid);
  }, [courseid, assignmentid]);

  const handleDownload = (submissionId) => {
    downloadSubmission(submissionId);
  };

  const formatSubmittedDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleString(undefined, options);
    return formattedDate;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>No Attempts found for the specified quiz.</p>;
  }

  if (!assignment) {
    return (
      <p className='flex ml-40 font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-bold'>
        No Submissions found for this Assignment.
      </p>
    );
  }

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col w-3/4'>
        {assignment.submissions &&
          assignment.submissions.map((submission) => (
            <div className='flex gap-8 p-4 drop-shadow-lg border mt-8 bg-gray-100' key={submission.id}>
              <div className='flex flex-col w-1/3'>
                <p className='font-sans leading-2 text-start tracking-wide text-xl text-[#111827] font-bold'>
                  {submission.studentName}
                </p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{submission.email}</p>
              </div>
              <div className='flex flex-row w-1/3 gap-4'>
                <button onClick={() => handleDownload(submission._id)}>
                  <CgSoftwareDownload className='w-6 h-6' />
                </button>
              </div>
              <div className='flex w-1/3 items-end'>
                <p className='ml-4 text-sm text-gray-500 dark:text-gray-400'>
                  submittedAt: {formatSubmittedDate(submission.submittedAt)}
                </p>
              </div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  assignment: state.submission.assignment,
});

const mapDispatchToProps = {
  uploadedSolution,
  downloadSubmission,
};

export default connect(mapStateToProps, mapDispatchToProps)(Submissions);
