import React from 'react';
import Entry from './Entry';

const ListDisplay = (props) => {
  if(props.posts) {
    const researchArray = props.posts
    return (
      <div>
        <div>Displaying: {props.displaying}</div>
        {researchArray.map((research) => {
          return <Entry key={research.name} name={research.name} tags={research.tags} />
        })}
      </div>
    )

  } else {
    return (
      <div>
        <div>Displaying: {props.displaying}</div>
        <div>Loading</div>
      </div>
    )
  }

}


export default ListDisplay;