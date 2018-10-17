import React from 'react';
import Entries from './Entries';

const ListDisplay = (props) => {
  if (props.posts) {
    const researchArray = props.posts
    return (
      <div>
        <div>Displaying: {props.displaying}</div>
        {researchArray.map((research) => {
          return (
            <div>
              <h3>Research Line: {research.name}</h3>
              <span>Tags: {research.tags}</span>
              <h4>Last update: {research.updated_at}</h4>
              <Entries key={research.name} entries={research.entries} />
            </div>
          )
        })}
      </div>
    )

  } else {
    return (
      <div>
        <div>Displaying: {props.displaying}</div>
        <h1>Loading...</h1>
      </div>
    )
  }

}


export default ListDisplay;