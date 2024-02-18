import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  allowedRoles
}) => {
  const navigate = useNavigate();
  // console.log("Private Route",user);

  useEffect(() => {
    const checkAccess = () => {
      if (loading) {
        return <Spinner />; // Display a loading indicator
      }

      if (!isAuthenticated) {
        navigate('/login');
      } else {
        if (user) {
          const userRole = user.userRole;
          localStorage.setItem("userRole",userRole)
          if (!allowedRoles.includes(userRole)) {
            navigate('/unauthorized');
          }
        }
      }
    };

    checkAccess();
  }, [user, allowedRoles, isAuthenticated, loading, navigate]);

  if (loading) return <Spinner />;

  return <Component />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  allowedRoles: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
