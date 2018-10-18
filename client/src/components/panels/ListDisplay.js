import React from 'react';
import Entries from './Entries';
import {Link} from 'react-router-dom';

const ListDisplay = (props) => {
  if (props.posts) {
    const researchArray = props.posts
    return (
      <div>
        <div>Displaying: {props.displaying}</div>
        {researchArray.map((research) => {
          console.log(research)
          const date = research.updated_at.slice(0, 10);
          return (
            <div>
              <div className="research-block">
                <h2>Research Line: {research.name}</h2>
                <span>Field: {research.field}</span>
                <h4>Last update: {date}</h4>
                <Link to='/'><button onClick={()=>{props.branchThisResearch(research.name, research.field)}}>Branch this research</button></Link>
              </div>
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