import React from 'react';
import Entry from './Entry';

const ListDisplay = (props) => {
  const posts = props.posts.data
  console.log(props.posts)
  if(props.posts.data) {
    return (
      <div>
        {posts.map((post) => {
          return <Entry name={post.name} tags={post.tags} />
        })}
      </div>
    )

  } else {
    return (
      <div>Loading</div>
    )
  }

}


export default ListDisplay;