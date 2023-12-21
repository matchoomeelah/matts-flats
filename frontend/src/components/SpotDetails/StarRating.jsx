function StarRating({currSpot}) {
    return (
        <div className='star-rating'>
            <i className="fas fa-star"></i>
            {currSpot.avgRating === 'New' ? 'New' : parseFloat(currSpot.avgRating).toFixed(1)}
            {currSpot.numReviews > 0 && <span>&#x2022;</span>}
            {currSpot.numReviews > 0 && currSpot.numReviews === 1 && <span> {currSpot.numReviews} Review</span>}
            {currSpot.numReviews > 0 && currSpot.numReviews !== 1 && <span> {currSpot.numReviews} Reviews</span>}
        </div>
    )
}

export default StarRating;
