import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReviewModal from '../ReviewDisplay/DeleteReviewModal/DeleteReviewModal';

function UpdateDeleteButtons({ reviewId, spotId }) {

    function clickUpdate() {
        alert("Feature Coming Soon!")
    }

    return (
        <div className="update-delete-buttons">
            <button id="manage-reviews-update-button"onClick={clickUpdate}>Update</button>
            <OpenModalButton
                buttonText='Delete'
                buttonId='manage-reviews-delete-button'
                modalComponent={<DeleteReviewModal reviewId={reviewId} spotId={spotId} />}
            />
        </div>
    )
}

export default UpdateDeleteButtons;
