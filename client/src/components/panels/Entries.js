import React from 'react';
import Entry from './Entry'

const Entries = (props) => {

  return (
    <div className="entries-wrapper">
      {props.entries.map((entry, i) => {
        return (
          <div key={i}>
            <h3 className="entry-name">Entry name: {entry.name}</h3>
            <Entry key={entry.name} rawData={entry.data} />
          </div>
        )
      })}
    </div>
  )

}


export default Entries;