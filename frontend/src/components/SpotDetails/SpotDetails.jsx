import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotById, thunkLoadSpots } from '../../store/spots';
import './SpotDetails.css'

function SpotDetails() {

    // Load in the spotId from the url and get the currentSpot
    const spotId = useParams().spotId;
    const currSpot = useSelector(state => state.spots.currentSpot);
    // console.log("Spot Details, current spot:", currSpot);


    // Import dispatch for thunks
    const dispatch = useDispatch();

    // Load the spots for reload
    useEffect(() => {
        dispatch(thunkGetSpotById(spotId));
    }, [dispatch])


    // Wait for the spot to load
    if (!currSpot) {
        return null;
    }

    // Function for reserve button
    const reserveAlert = () => {
        alert('Feature Coming Soon');
    }

    return (
        <div className='spot-details-container'>
            <h1>{currSpot.name}</h1>
            <div className='location-details'>
                LOCATION: {currSpot.city}, {currSpot.state}, {currSpot.country}
            </div>
            <div className='owner-details'>
                OWNER: {currSpot.Owner.firstName} {currSpot.Owner.lastName}
            </div>
            <div className='description'>
                DESCRIPTION: {currSpot.description}
            </div>
            <div className='callout-info'>
                <div>Check in date</div>
                <div>Check out date</div>
                <div>PRICE: {currSpot.price} night </div>
                <button onClick={reserveAlert} className='reserve-button'>
                    Reserve
                </button>
            </div>
        </div>
    )
}

export default SpotDetails;
