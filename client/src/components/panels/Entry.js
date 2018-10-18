import React from 'react';
import Graph from '../input/Graph'

const Entry = (props) => {
  return (
    <div>
      {props.rawData.map((block, i) => {
        if (block.type === "graph") {
          return (
           <Graph key={i} type={block.data[0]} labels={block.data[1]} data={block.data[2]} />
          )
        } else {
          return (
            <div key={i} dangerouslySetInnerHTML={{ __html: block.data }} />)
        }
      })}
    </div>
  )
}

export default Entry;

 