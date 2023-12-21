import {useSelector} from 'react-redux';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';

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
            {sessionUser
            && sessionUser.id === review.User.id
            && <OpenModalButton
            buttonText='Delete'
            modalComponent={<DeleteReviewModal reviewId={review.id}/>}
            />}
        </div>

        // <div className="review-tile">
        //     <div className="reviewer-name">Name: {review.User.firstName}</div>
        //     <div className="review-stars">
        //         <i className="fas fa-star"> </i>
        //         {review.stars}
        //         <span> {new Date(review.createdAt).toLocaleString('default', {month: 'long'})} {new Date(review.createdAt).getFullYear()} </span>
        //     </div>
        //     <div className="review-content">{review.review}</div>
            // {sessionUser
            // && sessionUser.id === review.User.id
            // && <OpenModalButton
            // buttonText='Delete'
            // modalComponent={<DeleteReviewModal reviewId={review.id}/>}
            // />}
        // </div>
    );
}

export default ReviewTile;
