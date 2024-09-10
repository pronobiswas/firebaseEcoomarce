import React from 'react'

const PostCard = ({title , catagory , location}) => {
  return (
    <div>
      <div className="postCard w-48 bg-slate-400 px-2 py-5">
        <div className="postImage w-full h-36 bg-red-400">

        </div>
        <h3>{title}</h3>
        <h4> {catagory}</h4>
        <p>{location}</p>
      </div>
    </div>
  )
}

export default PostCard
