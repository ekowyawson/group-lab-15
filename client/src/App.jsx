import React, { useState, useEffect } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import AuthButtons from './Auth/AuthButtons.jsx';
import axios from 'axios';
import Dogs from './components/Dogs.jsx';

const SERVER = import.meta.env.VITE_SERVER_URL;

function App({ auth0 }) {
  const [dogs, setDogs] = useState([]);

  console.log(dogs);

  async function getDogs() {
    if (!auth0.isAuthenticated) {
      console.log('User is not authenticated.');
      return;
    }

    try {
      let claim = await auth0.getIdTokenClaims();

      if(!claim) {
        console.log('Token claim is undefined.');
        return;
      }

      let token = claim.__raw;
      const config = {
        headers: { "Authorization": `Bearer ${token}` },
        method: "get",
        url: `${SERVER}/dogs`
      };

      let response = await axios(config);
      setDogs(response.data);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  }

  // useEffect(() => {
  //   if(auth0.isAuthenticated) {
  //     getDogs();
  //   }
  // }, [auth0.isAuthenticated]);

  return (
    <div>
      <h1>Our App</h1>
      <AuthButtons />
      <hr />
      {auth0.isAuthenticated && <Dogs dogs={dogs} />}

      <button onClick={getDogs}>Get Some Dogs</button>
    </div>
  );
}

export default withAuth0(App);
