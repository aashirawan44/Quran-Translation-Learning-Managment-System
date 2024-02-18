import { Link, useParams } from 'react-router-dom';
import InstructorSecondaryHeader from './InstructorSecondaryHeader';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadAssignment } from '../../redux/actions/assignment';
import PropTypes from 'prop-types';
import Button from '../button/Button';

const InstructorAssignments = ({ uploadAssignment }) => {
  const { courseid } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    file: null,
  });

  const { title, description, dueDate, file } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (e) =>
    setFormData({ ...formData, file: e.target.files[0] });

  const onSubmit = (e) => {
    e.preventDefault();

    const formDataWithFile = new FormData();
    formDataWithFile.append('title', title);
    formDataWithFile.append('description', description);
    formDataWithFile.append('dueDate', dueDate);
    formDataWithFile.append('file', file);

    uploadAssignment(courseid, formDataWithFile).then(() => {
      // Clear form data on successful upload
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        file: null,
      });
      const fileInput = document.getElementById('fileInput');
      fileInput.value = ''; // clear file input value
    });
  };

  return (
    <>
      {/* <InstructorSecondaryHeader courseId={courseid}/> */}
      <Link to={`/courses/${courseid}/instructorcourseassignments`} className="text-green-800 hover:underline">
        <div className="flex items-center gap-2 mt-4 ml-32">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </div>
      </Link>


      <div className="flex flex-col gap-8 items-center mt-4">
        <h2 className="font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold">
          Upload Assignment
        </h2>
        <form
          className="flex flex-col items-start gap-4 p-6 rounded-md shadow-lg bg-white"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="flex flex-col gap-4">
            <input
              className="border-2 border-gray-500 p-2 outline-none rounded-md"
              type="text"
              placeholder="Enter Title"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
            <textarea
              className="border-2 border-gray-500 p-2 outline-none rounded-md"
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description}
              onChange={onChange}
            />
            <div>Due Date</div>
            <input
              className="border-2 border-gray-500 p-2 outline-none rounded-md"
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={(e) => onChange(e)}
              required
            />
            <div className="flex flex-col">
              <p>File (ppt, pptx, doc, docx, pdf only)</p>
              <input
                id="fileInput"
                className="border-2 border-gray-500 p-2 outline-none rounded-md"
                type="file"
                name="file"
                onChange={(e) => onFileChange(e)}
                required
              />
            </div>
            <button
              className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600"
              type="submit"
            >
              <Button name="Upload" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

InstructorAssignments.propTypes = {
  uploadAssignment: PropTypes.func.isRequired,
};

export default connect(null, { uploadAssignment })(InstructorAssignments);
