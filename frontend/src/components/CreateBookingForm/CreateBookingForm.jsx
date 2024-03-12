import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { thunkGetSpotById } from '../../store/spots';
import { thunkGetReviewsBySpotId } from '../../store/reviews';
import './CreateBookingForm.css'
import { thunkAddBooking } from '../../store/bookings';
import ReservationDetails from './ReservationDetails';


function CreateBookingForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Load in the spotId from the url and get the currentSpot
    const sessionUser = useSelector(state => state.session.user)
    const spotId = useParams().spotId;
    const currSpot = useSelector(state => state.spots.currentSpot);

    // Variables to hold form values
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guests, setGuests] = useState(1);
    const [travelInsurance, setTravelInsurance] = useState(false);
    const [ccNumber, setCCNumber] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cvv, setCVV] = useState("")
    const [zipCode, setZipCode] = useState("")


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(thunkGetSpotById(spotId));
        dispatch(thunkGetReviewsBySpotId(spotId));
    }, [dispatch, spotId])

    if (!sessionUser) {
        return <h1>Please log in or sign up to book!</h1>
    }

    const handleSubmit = async e => {
        e.preventDefault();

        dispatch(thunkAddBooking({
                spotId,
                userId: sessionUser.id,
                startDate,
                endDate
        }))

        navigate(`/spots/${currSpot.id}`);
    }

    return (
        <div id='outer-container'>
            <form id='booking-details-form' onSubmit={handleSubmit}>
                <h1>Request To Book</h1>
                <h2>Your Trip</h2>
                <h3>Dates</h3>
                <div id='date-selection-container'>
                    <input
                        type='date'
                        id='start-date-input'
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}></input>
                    <p id="date-dash">-</p>
                    <input
                        type='date'
                        id='end-date-input'
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}></input>
                </div>

                <h3>Guests</h3>
                <div id="guest-selection-container">
                    <input
                        type="number"
                        id="guest-input"
                        min={1}
                        value={guests}
                        onChange={e => setGuests(e.target.value)}></input>
                    <p>guest(s)</p>
                </div>

                <div className='booking-form-horizontal-line'></div>

                <div id='travel-insurance-heading'>
                    <h2>Travel Insurance</h2>
                    <input
                        type='checkbox'
                        id="travel-insurance-input"
                        value={travelInsurance}
                        onChange={e => setTravelInsurance(e.target.value)}></input>
                </div>
                <p>Add peace of mind for $109.11</p>
                <p>Get reimbursed if you cancel due to illness, flight delays, and more. Plus, get assistance services like emergency help.</p>
                <a href='#'>What&apos;s covered</a>

                <div className='booking-form-horizontal-line'></div>

                <h2>Payment</h2>
                <div id="payment-info-container">
                    <input id="ccn" inputMode="numeric" pattern="[0-9\s]{13,19}"
                        maxLength="19"
                        placeholder="Card Number"
                        value={ccNumber}
                        onChange={e => setCCNumber(e.target.value)}required>
                    </input>
                    <div id="exp-cvv-container">
                        <input
                            id="exp"
                            placeholder='MM/YY'
                            maxLength="5"
                            value={expDate}
                            onChange={e => setExpDate(e.target.value)}
                            required></input>
                        <input
                            id="cvv"
                            placeholder='CVV'
                            maxLength="4"
                            value={cvv}
                            onChange={e => setCVV(e.target.value)}
                            required></input>
                    </div>
                    <input
                        id="zip-code"
                        placeholder='Zip Code'
                        maxLength="10"
                        value={zipCode}
                        onChange={e => setZipCode(e.target.value)}></input>
                    <button id="confirm-pay-button" type="submit">Confirm and Pay</button>
                </div>
            </form>

            <ReservationDetails guests={guests} travelInsurance={travelInsurance} />
        </div>
    )
}

export default CreateBookingForm;
