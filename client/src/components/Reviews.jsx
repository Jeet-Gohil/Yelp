import React from 'react'
import RatingStar from './RatingStar';

const Reviews = ({reviews}) => {
  return (
   <div className="row row-cols-3 mb-2">
    {reviews && reviews.map && reviews.map((review)=> {
        return (
            <div key={review.id}
            className="card text-white bg-primary mb-3" style = {{maxWidth: "30%"}}>
        <div className="card-header d-flex justify-content-between">
            <span>{review.name}</span>
            <span><RatingStar rating={review.rating}/></span>
        </div>
        <div className="card-body">
            <div className="card-text">{review.review}</div>
        </div>
    </div>
        )
    })}
    {/* <div className="card text-white bg-primary mb-3" style = {{maxWidth: "30%"}}>
        <div className="card-header d-flex justify-content-between">
            <span>JEET</span>
            <span><RatingStar rating={4}/></span>
        </div>
        <div className="card-body">
            <div className="card-text">This is my Reviews</div>
        </div>
    </div>
    <div className="card text-white bg-primary mb-3" style = {{maxWidth: "30%"}}>
        <div className="card-header d-flex justify-content-between">
            <span>JEET</span>
            <span><RatingStar rating={4}/></span>
        </div>
        <div className="card-body">
            <div className="card-text">This is my Reviews</div>
        </div>
    </div>
    <div className="card text-white bg-primary mb-3 mr-4" style = {{maxWidth: "30%"}}>
        <div className="card-header d-flex justify-content-between">
            <span>JEET</span>
            <span><RatingStar rating={4}/></span>
        </div>
        <div className="card-body">
            <div className="card-text">This is my Reviews</div>
        </div>
    </div>
    <div className="card text-white bg-primary mb-3 mr-4" style = {{maxWidth: "30%"}}>
        <div className="card-header d-flex justify-content-between">
            <span>JEET</span>
            <span><RatingStar rating={4}/></span>
        </div>
        <div className="card-body">
            <div className="card-text">This is my Reviews</div>
        </div>
    </div> */}
   </div>
  )
}

export default Reviews;
