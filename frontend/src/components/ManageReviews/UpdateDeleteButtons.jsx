// import { useNavigate } from 'react-router-dom'
// import {useDispatch} from 'react-redux';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReviewModal from '../ReviewDisplay/DeleteReviewModal/DeleteReviewModal';

function UpdateDeleteButtons({ reviewId }) {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    function clickUpdate() {
        // dispatch(thunkGetSpotById(spotId));
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
