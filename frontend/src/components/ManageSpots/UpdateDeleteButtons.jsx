import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { thunkGetSpotById } from '../../store/spots';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal.jsx/DeleteSpotModal';


function UpdateDeleteButtons({spotId}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function clickUpdate() {
        dispatch(thunkGetSpotById(spotId));
        navigate(`/spots/${spotId}/edit`);
    }


    return (
        <div className="update-delete-buttons">
            <button className='update-button' onClick={clickUpdate}>Update</button>
            <OpenModalButton
                buttonText='Delete'
                buttonId='delete-spot-button'
                modalComponent={<DeleteSpotModal
                spotId={spotId} />}
                />
        </div>
    )
}

export default UpdateDeleteButtons;
