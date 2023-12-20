import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetSpotById } from '../../store/spots';
import { thunkGetReviewsBySpotId } from '../../store/reviews';

import SpotImagesDisplay from './SpotImagesDisplay/SpotImagesDisplay';
import ReviewDisplay from '../ReviewDisplay/ReviewDisplay';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import StarRating from './StarRating';
import './SpotDetails.css';

function SpotDetails() {

    // Load in the spotId from the url and get the currentSpot
    const spotId = useParams().spotId;
    const currSpot = useSelector(state => state.spots.currentSpot);
    const reviews = useSelector(state => state.reviews);
    const sessionUser = useSelector(state => state.session.user);
    console.log("SPOT", currSpot);


    // Import dispatch for thunks
    const dispatch = useDispatch();


    // Load the spots for reload
    useEffect(() => {
        dispatch(thunkGetSpotById(spotId));
        dispatch(thunkGetReviewsBySpotId(spotId));
    }, [dispatch, spotId])


    // Wait for the spot to load
    if (!currSpot || !reviews) {
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
            <StarRating currSpot={currSpot} />

            <div className='callout-info'>
                <div>Check in date</div>
                <div>Check out date</div>
                <div>PRICE: {currSpot.price} night </div>
                <button onClick={reserveAlert} className='reserve-button'>
                    Reserve
                </button>
            </div>
            <StarRating currSpot={currSpot} />
            {sessionUser
            && !Object.values(reviews).find(rev => rev.userId === sessionUser.id)
            && currSpot.ownerId !== sessionUser.id
            && (<OpenModalButton
                buttonText='Post Your Review'
                modalComponent={<ReviewFormModal />}
                />)}
            <ReviewDisplay reviews={reviews} />
        </div>
    )
}

export default SpotDetails;
