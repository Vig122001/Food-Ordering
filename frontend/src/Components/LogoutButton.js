import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import App from '../App';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="bkgn">
        <button
          className="btn btn-primary"
          style={{ float: 'right', margin: '10px' }}
          onClick={() => logout()}
        >
          Log Out
        </button>
        <App />
      </div>
    )
  );
};

export default LogoutButton;
