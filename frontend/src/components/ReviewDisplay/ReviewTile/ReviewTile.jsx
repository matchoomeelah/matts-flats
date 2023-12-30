import {useSelector} from 'react-redux';
import UpdateDeleteButtons from '../../ManageReviews/UpdateDeleteButtons';
import '../ReviewDisplay.css';

function ReviewTile({ review }) {
    const sessionUser = useSelector(state => state.session.user);

    if (!review) {
        return null;
    }

    return (
        <div className="review-tile">
            <h2 className='reviewer-name'>{review.User.firstName}</h2>
            <h3 className='review-date'>{new Date(review.createdAt).toLocaleString('default', {month: 'long'})} {new Date(review.createdAt).getFullYear()} </h3>
            <p className='review-comment'>{review.review}</p>
            {review.ReviewImages && review.ReviewImages.length > 0 && review.ReviewImages.map(image => <img className='review-image' key={image.id} src={image.url}></img>)}
            {sessionUser
            && sessionUser.id === review.User.id
            && <UpdateDeleteButtons reviewId={review.id} spotId={review.spotId}
            />}
        </div>

    );
}

export default ReviewTile;
