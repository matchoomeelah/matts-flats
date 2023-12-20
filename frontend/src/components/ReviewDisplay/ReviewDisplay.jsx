import ReviewTile from "./ReviewTile/ReviewTile"
import './ReviewDisplay.css'
import { useSelector } from 'react-redux';


function ReviewDisplay({ reviews }) {
    const spotReviews = useSelector(state => state.reviews.spotReviews);

    if (Object.values(reviews).length === 0) {
        return <h3>Be the first to post a review!</h3>;
    }


    // console.log("SPOT REVIEWS: ", spotReviews);

    return (
        <div className="review-display">
            {/* Sort the values so newer reviews (with higher id prop) come first */}
            {Object.values(spotReviews).sort((a, b) => b.id - a.id).map(rev => {
               return <ReviewTile key={rev.id} review={rev}/>
            })}
        </div>
    )
}

export default ReviewDisplay
