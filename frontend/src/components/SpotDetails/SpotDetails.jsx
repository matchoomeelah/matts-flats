import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkLoadSpots } from '../../store/spots';
import './SpotDetails.css'

function SpotDetails() {

    // Load in the spotId from the url and get all the spots
    const spotId = useParams().spotId;
    const allSpots = useSelector(state => state.spots.allSpots);
    console.log("ALL SPOTS:", allSpots);

    // Find the current spot based on the spotId
    const currSpot = allSpots.find(spot => spot.id == spotId);
    console.log("CURRSPOT: ", currSpot);

    // Import dispatch for thunks
    const dispatch = useDispatch();

    // Load the spots for reload
    useEffect(() => {
        dispatch(thunkLoadSpots());
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
                OWNER: (coming soon)
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
