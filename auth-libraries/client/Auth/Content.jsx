import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

function Content(props) {

  return (
    <ul>
      {
        props.dogs.map( dog => {
          <li key={dog._id}>{dog.name} | {dog.breed} | {dog.hair}</li>
        })
      }
    </ul>
  )

}

export default withAuth0(Content);
