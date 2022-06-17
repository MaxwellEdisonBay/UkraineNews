import React from 'react'
import "./Post.css"

export default function Post() {
  return (
    <div className='post'>
        <img 
        className='post-img'
        src='/images/img-1.jpg'
        alt=""
        />
        <div className='post-info'>
            <div className='post-cats'>
                <span className='post-cat'>Music</span>
                <span className='post-cat'>Life</span>
            </div>
            <span className='post-title'>
                Lorem ipsum dolor sit amet
            </span>
            <hr/>
            <span className='post-date'>1 hour ago</span>
        </div>
    </div>
  )
}
