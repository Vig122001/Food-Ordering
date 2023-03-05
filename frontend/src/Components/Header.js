import React, { useState } from 'react';
import '../Styles/Header.css';
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

const modalStyle = {
  content: {
    top: '50%',
    left: '30%',
    right: 'auto',
    bottom: 'auto',
    width: '600px',
    marginRight: '-50%',
    tranform: 'translate(-50%,-50%)',
  },
};

Modal.setAppElement('#root');
export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateAccoutModalOpen, setIsCreateAccountModalOpen] =
    useState(false);

  const facebookLogin = (response) => {
    console.log(response);
  };

  const googleLogin = (response) => {
    console.log(response);
  };

  return (
    <div className="header">
      <div className="s-logo">
        <span>e!</span>
      </div>
      <div className="btn-group login-block">
        <span className="login" onClick={() => setIsLoginModalOpen(true)}>
          <button className="btn btn-primary"> LogIn</button>
        </span>
        <span
          className="signUp"
          onClick={() => setIsCreateAccountModalOpen(true)}
        >
          <button className="btn btn-primary border-remove">
            Create Account
          </button>
        </span>
      </div>
      <Modal isOpen={isLoginModalOpen} style={modalStyle}>
        <h2>
          Login
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="btn btn-outline-danger float-end"
          >
            X
          </button>
        </h2>
        <form>
          <div>
            <div>
              <input
                placeholder="email"
                type="email"
                className="forrm-control"
              />
            </div>
            <div>
              <input
                placeholder="password"
                type="password"
                className="forrm-control"
              />
            </div>
            <div className="text-center">
              <button>Login</button>
            </div>
          </div>
          <div
            class="fb-like"
            data-share="true"
            data-width="450"
            data-show-faces="true"
          ></div>
          <div className="mt-4">
            <FacebookLogin
              appId="603042084002968"
              autoLoad={true}
              fields="name,email,picture"
              callback={facebookLogin()}
              cssClass="btn btn-primary"
              icon="fa-facebook"
              textButton="&nbsp;&nbsp;Sign In with Facebook"
            />

            <GoogleLogin
              clientId="475244254393-8pi9idnr9nj4uv4f2m5nd30cvsvcla3g.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={googleLogin()}
              onFailure={googleLogin()}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
              className="btnGoogle"
            />
          </div>
        </form>
      </Modal>
      <Modal isOpen={isCreateAccoutModalOpen} style={modalStyle}>
        <h2>
          Create new Account
          <button
            onClick={() => setIsCreateAccountModalOpen(false)}
            className="btn btn-outline-danger float-end"
          >
            X
          </button>
        </h2>
        <form>
          <div class="form-group">
            <label for="exampleInputUsername1">Username</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputUsername1"
              placeholder="Username"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              required
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
}
