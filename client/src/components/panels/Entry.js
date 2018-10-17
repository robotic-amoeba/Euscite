import React from 'react';
import Graph from '../input/Graph'

const Entry = (props) => {
  return (
    <div>
      {props.rawData.map((block) => {
        if (block.type === "graph") {
          return (
           <Graph type={block.data[0]} labels={block.data[1]} data={block.data[2]} />
          )
        } else {
          return (
            <div dangerouslySetInnerHTML={{ __html: block.data }} />)
        }
      })}
    </div>
  )
}

export default Entry;

 