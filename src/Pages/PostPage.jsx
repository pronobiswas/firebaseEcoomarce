import React from 'react'

const PostPage = () => {
  return (
    <div>
      <h2>post your service with aquerecy</h2>
      <div>
        <form>
            <div className="username">
                <label htmlFor="username">Your Name</label>
                <input type="text" placeholder='Enter your full Name' />
            </div>
            <div className="userEmail">
                <label htmlFor="userEmail">Your email</label>
                <input type="text" placeholder='Enter your Email' />
            </div>
            <div className="postType">
                <select name="postType" id="postType">
                    <option value="basaVara">basa vara</option>
                    <option value="gariVara">gari vara</option>
                </select>
            </div>
            <div className="locaion">
                <label htmlFor="username">Your location</label>
                <input type="text" placeholder='Enter your full Location' />
            </div>

        </form>
      </div>
    </div>
  )
}

export default PostPage
