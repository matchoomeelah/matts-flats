import { useDispatch, useSelector } from 'react-redux';

import { thunkDeleteReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import './DeleteReview.css'


function DeleteReviewModal({reviewId, spotId}) {
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.reviews.userReviews);
    const currReview = userReviews[reviewId];

    const submitDelete = () => {
        try {
            dispatch(thunkDeleteReview(reviewId, spotId, currReview)).then(closeModal);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div id='delete-modal-container'>
            <h1 id='confirm-delete-heading'>Confirm Delete</h1>
            <h4>Are you sure you want to delete this review?</h4>
                <button id='yes-button' onClick={submitDelete}>Yes (Delete Review)</button>
                <button id='no-button' onClick={closeModal}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal;
