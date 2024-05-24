import React from 'react'
import "./rating.css"

function Rating({setopen}) {
  return (
    <div className='overlaymodal'>

        <form action="" className="ratingform df-c">
            <div className="title">feedback</div>
            <div>how would you rate this freelancer</div>
                <div class="containerrating">
            <div class="star-group">
                <input type="radio" class="star" id="one" name="star_rating" checked />
                <input type="radio" class="star" id="two" name="star_rating" />
                <input type="radio" class="star" id="three" name="star_rating" />
                <input type="radio" class="star" id="four" name="star_rating" />
                <input type="radio" class="star" id="five" name="star_rating" />
            </div>
        </div>
        <div>your feedback</div>
    <textarea name="" id="" placeholder='add your feedback'></textarea>
        <button className='primary-btn w-100'>submit</button>
        <div className='danger-btn w-100' onClick={()=>setopen(false)}>cancel</div>

        </form>
    </div>
  )
}

export default Rating