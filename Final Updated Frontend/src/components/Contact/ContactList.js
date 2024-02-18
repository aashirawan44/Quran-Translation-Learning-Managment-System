import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/actions/contact';
import { Link } from 'react-router-dom'; 

const ContactList = ({ contacts, fetchContacts, deleteContact }) => {
  useEffect(() => {
    // Fetch contacts when the component mounts
    fetchContacts();
  }, [fetchContacts]);

  const handleDelete = (id) => {
    // Delete contact by ID
    deleteContact(id);
  };

  return (
<div className="flex flex-col items-center h-screen bg-gray-100 px-12">
      <Link to="/AdminDashboard" className="bg-green-500 text-white px-4 py-2 rounded mt-6 mb-6">
        Back
      </Link>
      <h2 className="text-2xl font-semibold mb-4    ">Contact List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td className="py-2 px-4 border-b">{contact.email}</td>
              <td className="py-2 px-4 border-b">{contact.description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contact.submissions,
});

const mapDispatchToProps = {
  fetchContacts,
  deleteContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
