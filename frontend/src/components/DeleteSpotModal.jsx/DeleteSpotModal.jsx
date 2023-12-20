import './DeleteSpot.css';


function DeleteSpotModal() {
    return (
        <div id='delete-modal-container'>
            <h1 id='confirm-delete-heading'>Confirm Delete</h1>
            <h4>Are you sure you want to remove this spot?</h4>
            <div id='confirmation-buttons-container'>
                <button id='yes-button'>Yes (Delete Spot)</button>
                <button id='no-button'>No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSpotModal;
