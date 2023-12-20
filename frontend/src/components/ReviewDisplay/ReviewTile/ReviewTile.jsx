import {useSelector} from 'react-redux';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';

function ReviewTile({ review }) {

    const MONTHS = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }

    const sessionUser = useSelector(state => state.session.user);

    // console.log('REVIEW TILE REVIEW: ', review);

    if (!review) {
        return null;
    }

    return (
        <div className="review-tile">
            <div className="reviewer-name">Name: {review.User.firstName}</div>
            <div className="review-stars">
                <i className="fas fa-star"> </i>
                {review.stars}
                <span>  {MONTHS[new Date(review.createdAt).getMonth() + 1]} {new Date(review.createdAt).getFullYear()} </span>
            </div>
            <div className="review-content">{review.review}</div>
            {sessionUser
            && sessionUser.id === review.User.id
            && <OpenModalButton
            buttonText='Delete'
            modalComponent={<DeleteReviewModal reviewId={review.id}/>}
            />}
        </div>
    );
}

export default ReviewTile;
