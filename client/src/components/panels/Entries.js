import React from 'react';
import Entry from './Entry'

const Entries = (props) => {

  return (
    <div>
      {props.entries.map((entry, i) => {
        return (
          <div>
            <h3>Entry name: {entry.name}</h3>
            <Entry key={entry.name} rawData={entry.data} />
          </div>
        )
      })}
    </div>
  )

}


export default Entries;