import React from 'react'

const PostCard = ({title , catagory , location ,description,Date}) => {
  return (
    <div>
      <div className="postCard w-44 rounded-md bg-slate-200 px-2 py-4 overflow-hidden ">
        <div className="postImage w-full h-32 bg-red-400">

        </div>
        <h3>{title}</h3>
        <h4> {catagory}</h4>
        <p>{location}</p>
        <p className='w-full max-h-8 text-ellipsis text-xs overflow-hidden'>{description}</p>
        <p className='w-full max-h-8 text-ellipsis text-xs font-thin mt-2'>{Date}</p>
      </div>
    </div>
  )
}

export default PostCard
