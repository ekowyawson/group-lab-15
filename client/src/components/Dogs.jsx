import React from 'react';

function Dogs({dogs}) {

  return (
    <ul>
      {
        dogs.map((dog, idx) =>
          <li key={dog._id}>{dog.name}</li>
        )
      }
    </ul>
  )
}

export default Dogs;