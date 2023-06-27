import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ isUserInvited }) {
  if (isUserInvited === true) {
    return <Navigate to="/welcome" replace />;
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  isUserInvited: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
