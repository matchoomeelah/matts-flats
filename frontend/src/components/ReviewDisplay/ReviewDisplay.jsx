import ReviewTile from "./ReviewTile/ReviewTile";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateReviewFormModal from '../CreateReviewFormModal/CreateReviewFormModal';
import './ReviewDisplay.css'
import { useSelector } from 'react-redux';


function ReviewDisplay({ reviews, currSpot }) {
    // State variables to watch
    const spotReviews = useSelector(state => state.reviews.spotReviews);
    const sessionUser = useSelector(state => state.session.user);

    // Get the avg rating from the store
    const currAvgRating = Object.values(spotReviews).reduce((acc, curr) => curr.stars + acc, 0) / Object.values(spotReviews).length;


    // Render the component
    return (
        <div className="review-display-container">
            <div id='big-star-rating'>
                <i className="fas fa-star"></i>
                <span style={{ 'marginRight': '7px', 'marginLeft': '2px' }}>{Object.values(spotReviews).length === 0 ? 'New' : parseFloat(currAvgRating).toFixed(1)}</span>
                <span style={{ 'marginRight': '5px', 'marginLeft': '2px' }}>{Object.values(spotReviews).length > 0 && <span>&#x2022;</span>}</span>
                {Object.values(spotReviews).length > 0  && Object.values(spotReviews).length === 1  && <span> {Object.values(spotReviews).length} Review</span>}
                {Object.values(spotReviews).length > 0  && Object.values(spotReviews).length !== 1 && <span> {Object.values(spotReviews).length} Reviews</span>}
            </div>

            {
                sessionUser
                && !Object.values(reviews).find(rev => rev.userId === sessionUser.id)
                && currSpot.ownerId !== sessionUser.id
                && (<span><OpenModalButton
                    buttonId='post-review-button'
                    buttonText='Post Your Review'
                    modalComponent={<CreateReviewFormModal  />}
                /></span>)
            }

            {Object.values(reviews).length === 0 && sessionUser && currSpot.ownerId !== sessionUser.id && <h3>Be the first to post a review!</h3>}

            <div id="review-tile-display">
                {/* Sort the values so newer reviews (with higher id prop) come first */}
                {Object.values(spotReviews).sort((a, b) => b.id - a.id).map(rev => {
                    return (
                        <div key={rev.id}>
                            <ReviewTile review={rev} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ReviewDisplay
