import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotById } from '../../store/spots';
import SpotImagesDisplay from './SpotImagesDisplay/SpotImagesDisplay';
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay';
import { thunkGetReviewsBySpotId } from '../../store/reviews';
import './SpotDetails.css'

function SpotDetails() {

    // Load in the spotId from the url and get the currentSpot
    const spotId = useParams().spotId;
    const currSpot = useSelector(state => state.spots.currentSpot);
    const reviews = useSelector(state => state.reviews);
    // console.log("REVIEWS", reviews);
    // console.log("CURR SPOT: ", currSpot);


    // Import dispatch for thunks
    const dispatch = useDispatch();


    // Load the spots for reload
    useEffect(() => {
        dispatch(thunkGetSpotById(spotId));
        dispatch(thunkGetReviewsBySpotId(spotId));
    }, [dispatch, spotId])


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
            <SpotImagesDisplay images={currSpot.SpotImages} />
            <div className='owner-details'>
                Hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}
            </div>
            <div className='description'>
                DESCRIPTION: {currSpot.description}
            </div>
            <div className='ratings-reviews'>
                <i className="fas fa-star"></i>
                {` ${currSpot.avgRating} `}
                {currSpot.numReviews > 0 && <span>&#x2022;</span>}
                {currSpot.numReviews > 0 && currSpot.numReviews === 1 && <span> {currSpot.numReviews} Review</span>}
                {currSpot.numReviews > 0 && currSpot.numReviews !== 1 && <span> {currSpot.numReviews} Reviews</span>}

            </div>
            <div className='callout-info'>
                <div>Check in date</div>
                <div>Check out date</div>
                <div>PRICE: {currSpot.price} night </div>
                <button onClick={reserveAlert} className='reserve-button'>
                    Reserve
                </button>
            </div>
            <div className='ratings-reviews'>
                <h2>
                    <i className="fas fa-star"></i>
                    {` ${currSpot.avgRating} `}
                    {currSpot.numReviews > 0 && <span>&#x2022;</span>}
                    {currSpot.numReviews > 0 && currSpot.numReviews === 1 && <span> {currSpot.numReviews} Review</span>}
                    {currSpot.numReviews > 0 && currSpot.numReviews !== 1 && <span> {currSpot.numReviews} Reviews</span>}

                </h2>
            </div>
            <ReviewDisplay reviews={reviews} />
        </div>
    )
}

export default SpotDetails;
