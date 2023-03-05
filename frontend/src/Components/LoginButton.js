import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../Styles/Header.css';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <center>
        <div className="header">
          <h1> Vini Food World</h1>

          <div className="wrap">
            <center>
              <div className="s-logo">
                <div>V!</div>
              </div>
            </center>
            <div className="btn-group">
              <div className="login">
                <button
                  className="btn btn-primary"
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </center>
    )
  );
};

export default LoginButton;
