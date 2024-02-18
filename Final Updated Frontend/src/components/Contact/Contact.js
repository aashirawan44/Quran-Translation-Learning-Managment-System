import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { submitContact } from '../../redux/actions/contact';

const ContactForm = ({ loading, successMessage, error, submitContact }) => {
  const [formData, setFormData] = useState({
    email: '',
    description: '',
  });

  useEffect(() => {
    // Reset the form once successMessage is received
    if (successMessage) {
      setFormData({
        email: '',
        description: '',
      });
    }
  }, [successMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear the form state
    setFormData({
      email: '',
      description: '',
    });
    // Submit the contact
    submitContact(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Contact Form</h2>
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-600 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.contact.loading,
  successMessage: state.contact.successMessage,
  error: state.contact.error,
});

const mapDispatchToProps = {
  submitContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
