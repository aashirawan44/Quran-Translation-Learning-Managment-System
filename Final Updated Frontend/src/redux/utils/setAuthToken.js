import api from './api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // Import connect from react-redux

// Define the setAuthToken function as a utility function
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    
    localStorage.setItem('token', token);
    
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

// Use PropTypes to specify the prop types for your components
setAuthToken.propTypes = {
  auth: PropTypes.object.isRequired,
};

// Define mapStateToProps to access the auth state
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default setAuthToken;
