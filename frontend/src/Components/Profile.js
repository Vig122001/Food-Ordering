import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <div>
      <img
        src={user.picture}
        alt={user.name}
        style={{
          width: '50px',
          height: '50px',
          margin: '10px',
        }}
      />

      {user.name}
      {/* {JSON.stringify(user, null, 2)} */}
    </div>
  );
};

export default Profile;
