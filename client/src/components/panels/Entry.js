import React from 'react';
import Graph from '../input/Graph'

const Entry = (props) => {
  return (
    <div>
      {props.rawData.map((block) => {
        console.log(block)
        if (Array.isArray(block)) {

          return (
            <Graph type labels data/>
          )
        } else {
          return (
            <div dangerouslySetInnerHTML={{ __html: block }} />)
        }
      })}
    </div>
  )
}

export default Entry;


