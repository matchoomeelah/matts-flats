import ReviewTile from "./ReviewTile/ReviewTile";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import './ReviewDisplay.css'
import { useSelector } from 'react-redux';


function ReviewDisplay({ reviews, currSpot }) {
    const spotReviews = useSelector(state => state.reviews.spotReviews);
    const sessionUser = useSelector(state => state.session.user);


    // console.log("SPOT REVIEWS: ", spotReviews);

    return (
        <div className="review-display-container">
            <div id='big-star-rating'>
                <i className="fas fa-star"></i>
                <span style={{ 'margin-right': '7px', 'margin-left': '2px' }}>{currSpot.avgRating === 'New' ? 'New' : parseFloat(currSpot.avgRating).toFixed(1)}</span>
                <span style={{ 'margin-right': '5px', 'margin-left': '2px' }}>{currSpot.numReviews > 0 && <span>&#x2022;</span>}</span>
                {currSpot.numReviews > 0 && currSpot.numReviews === 1 && <span> {currSpot.numReviews} Review</span>}
                {currSpot.numReviews > 0 && currSpot.numReviews !== 1 && <span> {currSpot.numReviews} Reviews</span>}
            </div>


            {
                sessionUser
                && !Object.values(reviews).find(rev => rev.userId === sessionUser.id)
                && currSpot.ownerId !== sessionUser.id
                && (<span><OpenModalButton
                    buttonText='Post Your Review'
                    modalComponent={<ReviewFormModal />}
                /></span>)
            }

            {Object.values(reviews).length === 0 && <h3>Be the first to post a review!</h3>}

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
