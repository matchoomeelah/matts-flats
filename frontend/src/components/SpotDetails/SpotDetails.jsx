import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkLoadSpots } from '../../store/spots';

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


    return (
        <div className='spot-details-container'>
            <h1>{currSpot.address}</h1>
        </div>
    )
}

export default SpotDetails;
