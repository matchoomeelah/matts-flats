import ReviewTile from "./ReviewTile/ReviewTile"
import './ReviewDisplay.css'

function ReviewDisplay({ reviews }) {
    if (Object.values(reviews).length === 0) {
        return <h3>Be the first to post a review!</h3>;
    }

    return (
        <div className="review-display">
            {/* Sort the values so newer reviews (with higher id prop) come first */}
            {Object.values(reviews).sort((a, b) => b.id - a.id).map(rev => {
               return <ReviewTile key={rev.id} review={rev}/>
            })}
        </div>
    )
}

export default ReviewDisplay
