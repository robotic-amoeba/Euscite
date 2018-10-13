import React from 'react';

const Entry = (props) => {

  return (
    <div>
      <h2>Research Line: {props.name}</h2>
      <h2>Tags: {props.tags}</h2>
      <h2>Last update: {props.updated_at}</h2>
      <p>Last posts:</p>
    </div>
  )

}


export default Entry;