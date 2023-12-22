import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReviewModal from '../ReviewDisplay/DeleteReviewModal/DeleteReviewModal';

function UpdateDeleteButtons({ reviewId }) {

    function clickUpdate() {
        alert("Feature Coming Soon!")
    }

    return (
        <div className="update-delete-buttons">
            <button onClick={clickUpdate}>Update</button>
            <OpenModalButton
                buttonText='Delete'
                modalComponent={<DeleteReviewModal reviewId={reviewId} />}
            />
        </div>
    )
}

export default UpdateDeleteButtons;
