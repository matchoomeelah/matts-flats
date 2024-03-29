import { useDispatch } from 'react-redux';

import { thunkDeleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './DeleteSpot.css';


function DeleteSpotModal({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const submitDelete = () => {
        try {
            dispatch((thunkDeleteSpot(spotId))).then(closeModal);
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div id='delete-modal-container'>
            <h1 id='confirm-delete-heading'>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot?</h4>
            <button id='yes-button' onClick={submitDelete}>Yes (Delete Spot)</button>
            <button id='no-button' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteSpotModal;
