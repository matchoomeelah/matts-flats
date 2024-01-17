import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';


import { thunkGetSpotById } from '../../store/spots';
import { thunkGetReviewsBySpotId } from '../../store/reviews';
import './CreateBookingForm.css'


function CreateBookingForm() {

    // Variables to hold form values
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [guests, setGuests] = useState(1);
    const [travelInsurance, setTravelInsurance] = useState(false);
    const [ccNumber, setCCNumber ]= useState("")
    const [expDate, setExpDate] = useState("")
    const [cvv, setCVV] = useState("")
    const [zipCode, setZipCode] = useState("")


    // Load in the spotId from the url and get the currentSpot
    const spotId = useParams().spotId;
    console.log(spotId)
    const currSpot = useSelector(state => state.spots.currentSpot);
    const spotReviews = useSelector(state => state.reviews.spotReviews);

    // Wait for the spot to load
    if (!currSpot || !spotReviews) {
        return null;
    }

    const currAvgRating = Object.values(spotReviews).reduce((acc, curr) => curr.stars + acc, 0) / Object.values(spotReviews).length;
    const previewImage = currSpot.SpotImages.find(image => image.preview);

    // Import dispatch for thunks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(thunkGetSpotById(spotId));
        dispatch(thunkGetReviewsBySpotId(spotId));
    }, [dispatch, spotId])


    return (
        <div id='outer-container'>
            <form id='booking-details-form'>
                <h1>Request To Book</h1>

                <h2>Your Trip</h2>
                <h3>Dates</h3>
                <div id='date-selection-container'>
                    <input
                        type='date'
                        id='start-date-input'
                        value={startDate}
                        onChange={e => {setStartDate(e.target.value); console.log(e.target.value)}}></input>
                    <p id="date-dash">-</p>
                    <input type='date' id='end-date-input'></input>
                </div>

                <h3>Guests</h3>
                <div id="guest-selection-container">
                    <input type="number" id="guest-input"></input>
                    <p>guest(s)</p>
                </div>

                <div className='booking-form-horizontal-line'></div>

                <h2>Travel Insurance</h2>
                <p>Add peace of mind for $109.11</p>
                <p>Get reimbursed if you cancel due to illness, flight delays, and more. Plus, get assistance services like emergency help.</p>
                <p>What's covered</p>

                <div className='booking-form-horizontal-line'></div>

                <h2>Payment</h2>
                <div id="payment-info-container">
                    <input id="ccn" inputmode="numeric" pattern="[0-9\s]{13,19}"
                        maxLength="19"
                        placeholder="Card Number" required>
                    </input>
                    <div id="exp-cvv-container">
                        <input id="exp" placeholder='MM/YY' maxLength="5"></input>
                        <input id="cvv" placeholder='CVV' maxLength="4"></input>
                    </div>
                    <input id="zip-code" placeholder='Zip Code' maxLength="10"></input>
                    <button id="confirm-pay-button" type="submit">Confirm and Pay</button>
                </div>


            </form>

            <div id='reservation-details-container'>
                <div id="spot-info-container">
                    <div id="preview-image-container">
                        <img src={previewImage.url}></img>
                    </div>
                    <div id="title-reviews-container">
                        <h3>{currSpot.name}</h3>
                        <div id='small-star-rating'>
                            <i className="fas fa-star"></i>
                            <span style={{ 'marginRight': '4px', 'marginLeft': '1px' }}>{Object.values(spotReviews).length === 0 ? 'New' : parseFloat(currAvgRating).toFixed(1)}</span>
                            <span style={{ 'marginRight': '3px', 'marginLeft': '2px' }}>{Object.values(spotReviews).length > 0 && <span>&#x2022;</span>}</span>
                            {Object.values(spotReviews).length > 0 && Object.values(spotReviews).length === 1 && <span> {Object.values(spotReviews).length} Review</span>}
                            {Object.values(spotReviews).length > 0 && Object.values(spotReviews).length !== 1 && <span> {Object.values(spotReviews).length} Reviews</span>}
                        </div>
                        <h5>Hosted by {`${currSpot.Owner.firstName} ${currSpot.Owner.lastName}`}</h5>
                    </div>
                </div>

                <div className='booking-details-horizontal-line'></div>

                <div id="price-details-container">
                    <h2 id="price-details-header">Price Details</h2>
                    <div className='price-detail'>
                        <p>${currSpot.price}/night x # nights</p>
                        <p>$###.##</p>
                    </div>
                    <div className='price-detail'>
                        <p>Cleaning fee</p>
                        <p>$##.##</p>
                    </div>
                    <div className='price-detail'>
                        <p>Matt's Flats fee</p>
                        <p>$##.##</p>
                    </div>
                    <div className='price-detail'>
                        <p>Taxes</p>
                        <p>$##.##</p>
                    </div>
                </div>

                <div className='booking-details-horizontal-line'></div>

                <div id="total-div" className='price-detail'>
                    <p>Total (USD)</p>
                    <p>$###.##</p>
                </div>


            </div>
        </div>
    )
}

export default CreateBookingForm;
