
import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { uploadCoursecontent } from '../../redux/actions/coursecontentActions';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from '../button/Button';
import SearchByWord from '../Quransearch/SearchByWord';

const UploadCoursecontent = ({ uploadCoursecontent }) => {
    const { courseid } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',

        file: null
    });
    const { title, description, file } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFileChange = (e) =>
        setFormData({ ...formData, file: e.target.files[0] });

    const onSubmit = (e) => {
        e.preventDefault();

        const formDataWithFile = new FormData();
        formDataWithFile.append('title', title);
        formDataWithFile.append('description', description);

        formDataWithFile.append('file', file);
        uploadCoursecontent(courseid, formDataWithFile)
            .then(() => {
                // Clear form data on successful upload
                setFormData({
                    title: '',
                    description: '',

                    file: null
                });
                // document.getElementById('formFile').value = ''; // clear file input value
            });
    };


    return (
        <>


            <SearchByWord />
            <div className='max-w-screen-xl mx-auto'>
  <h2 className='font-sans leading-4 text-start tracking-wider text-2xl text-[#111827] font-bold mb-4'>Add Course Content</h2>
  <form className='flex flex-col items-start gap-4 w-full' onSubmit={(e) => onSubmit(e)}>
  <div className='flex flex-col gap-4 w-full'>
    <input
      className='border rounded 1px p-2 outline-none rounded-md w-full'
      type="text"
      placeholder="Enter Title"
      name="title"
      value={title}
      onChange={onChange}
      required
    />
    <textarea
      className='border rounded 1px p-2 outline-none rounded-md w-full'
      name="description"
      cols="30"
      rows="5"
      placeholder="Program Description"
      value={description}
      onChange={onChange}
    />
    <div className='flex flex-col w-full'>
      <p>File (ppt, pptx, doc, docx, pdf only)</p>
      <label className={`flex items-center justify-center w-full border rounded-md p-4 outline-none cursor-pointer ${file ? 'bg-green-200 hover:bg-green-200' : 'bg-white'}`}>
        <span className={`text-gray-700 ${file ? '' : ''}`}>{file ? file.name : 'Choose File'}</span>
        <input
          type="file"
          name="file"
          onChange={(e) => onFileChange(e)}
          className='hidden'
          required
        />
      </label>
    </div>
    <button  className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md w-full' type="submit">
        Upload
      </button>
  </div>
</form>

</div>

        </>
    );
}
UploadCoursecontent.propTypes = {
    uploadCoursecontent: PropTypes.func.isRequired
};

export default connect(null, { uploadCoursecontent })(UploadCoursecontent);