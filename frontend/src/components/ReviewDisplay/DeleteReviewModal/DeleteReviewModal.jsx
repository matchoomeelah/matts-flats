import './DeleteReview.css'
import { useModal } from '../../../context/Modal';
import { useDispatch } from 'react-redux';
import { thunkDeleteReview } from '../../../store/reviews';

function DeleteReviewModal({reviewId}) {
    const {closeModal} = useModal();
    const dispatch = useDispatch();

    const submitDelete = () => {

        try {
            dispatch(thunkDeleteReview(reviewId)).then(closeModal);
        }
        catch (e) {
            console.log(e);
        }

    }


    return (
        <div id='delete-modal-container'>
            <h1 id='confirm-delete-heading'>Confirm Delete</h1>
            <h4>Are you sure you want to remove this review?</h4>
            <div id='confirmation-buttons-container'>
                <button id='yes-button' onClick={submitDelete}>Yes (Delete Review)</button>
                <button id='no-button' onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;
