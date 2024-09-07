import React from 'react'


const Homepage = () => {
  return (
    <div className='w-full max-w-[1200px] h-[500px] mx-auto px-5 flex'>

      <div className="filterMenu w-1/6 h-full bg-slate-200">
        <h2 className='text-2xl'>the filter</h2>
        <div>
          <details>
            <summary>basaVara</summary>
            <p>Bachelor</p>
            <p>Family</p>
          </details>
          <details>
            <summary>dokanVara</summary>
            <p>dokanVara</p>
          </details>
          <details>
            <summary>gariVara</summary>
            <p>bus</p>
            <p>truck</p>
            <p>picup</p>
            <p>hiex</p>
          </details>
          <details>
            <summary>gariVara</summary>
            <p>gariVara</p>
          </details>
        </div>
        <div>
          <details>
            <summary>By division</summary>
            <p>khulna</p>
            <p>khulna</p>
          </details>
        </div>
      </div>

      <div className="contentSection w-4/6 h-full bg-slate-300">
        <h2>the content</h2>
        <div className="row"></div>
      </div>

      <div className="adversmentSection w-1/6 h-full bg-slate-500">
        <h2>the addversment</h2>
      </div>


    </div>
  )
}

export default Homepage
