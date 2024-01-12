import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import UpdateReviewFormModal from '../UpdateReviewFormModal/UpdateReviewFormModal';

function UpdateDeleteButtons({ reviewId, spotId }) {

    return (
        <div className="update-delete-buttons">
            <OpenModalButton
                buttonText='Update'
                buttonId='manage-reviews-update-button'
                modalComponent={<UpdateReviewFormModal reviewId={reviewId} />}
            />
            <OpenModalButton
                buttonText='Delete'
                buttonId='manage-reviews-delete-button'
                modalComponent={<DeleteReviewModal reviewId={reviewId} spotId={spotId} />}
            />
        </div>
    )
}

export default UpdateDeleteButtons;
