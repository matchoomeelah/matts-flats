import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotById } from '../../store/spots';
import { thunkGetReviewsBySpotId } from '../../store/reviews';

import SpotImagesDisplay from './SpotImagesDisplay/SpotImagesDisplay';
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay';
import './SpotDetails.css';

function SpotDetails() {

    // Load in the spotId from the url and get the currentSpot
    const spotId = useParams().spotId;
    const currSpot = useSelector(state => state.spots.currentSpot);
    const spotReviews = useSelector(state => state.reviews.spotReviews);

    const currAvgRating = Object.values(spotReviews).reduce((acc, curr) => curr.stars + acc, 0) / Object.values(spotReviews).length;

    // Import dispatch for thunks
    const dispatch = useDispatch();


    // Load the spots for reload
    useEffect(() => {
        dispatch(thunkGetSpotById(spotId));
        dispatch(thunkGetReviewsBySpotId(spotId));
    }, [dispatch, spotId])


    // Wait for the spot to load
    if (!currSpot || !spotReviews) {
        return null;
    }

    // Function for reserve button
    const reserveAlert = () => {
        alert('Feature Coming Soon');
    }

    return (
        <div className='spot-details-container'>
            <h1 id='spot-title'>{currSpot.name}</h1>
            <div id='spot-location'>
                <h3>{currSpot.city}, {currSpot.state}, {currSpot.country} </h3>
            </div>
            <SpotImagesDisplay images={currSpot.SpotImages} />
            <div id='spot-owner-description-callout-container'>
                <div id='spot-owner-description-container'>
                    <div id='spot-owner'>
                        <h2>Hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName} </h2>
                    </div>
                    <div id='spot-description'>
                        <p>{currSpot.description}</p>
                    </div>
                </div>
                <div id='callout-info'>
                    <div id='price-reviews-container' >
                        <div>
                            <h2 style={{ 'display': 'inline', 'margin-right': '3px' }}>${currSpot.price}</h2>
                            <span>night</span>
                        </div>
                        <div id='small-star-rating'>
                            <i className="fas fa-star"></i>
                            <span style={{ 'margin-right': '4px', 'margin-left': '1px' }}>{Object.values(spotReviews).length === 0 ? 'New' : parseFloat(currAvgRating).toFixed(1)}</span>
                            <span style={{ 'margin-right': '3px', 'margin-left': '2px' }}>{Object.values(spotReviews).length > 0 && <span>&#x2022;</span>}</span>
                            {Object.values(spotReviews).length > 0 && Object.values(spotReviews).length === 1 && <span> {Object.values(spotReviews).length} Review</span>}
                            {Object.values(spotReviews).length > 0 && Object.values(spotReviews).length !== 1 && <span> {Object.values(spotReviews).length} Reviews</span>}
                        </div>
                    </div>
                    <button onClick={reserveAlert} id='reserve-button'>
                        Reserve
                    </button>
                </div>
            </div>

            <div className='separator'></div>

            <ReviewDisplay currSpot={currSpot} reviews={spotReviews} />
        </div>
    )
}

export default SpotDetails;
