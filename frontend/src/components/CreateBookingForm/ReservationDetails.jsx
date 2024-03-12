import { useSelector } from "react-redux";


function ReservationDetails() {
// function ReservationDetails({guests, travelInsurance}) {

    const currSpot = useSelector(state => state.spots.currentSpot);
    const spotReviews = useSelector(state => state.reviews.spotReviews);

    const currAvgRating = Object.values(spotReviews).reduce((acc, curr) => curr.stars + acc, 0) / Object.values(spotReviews).length;
    const previewImage = currSpot?.SpotImages.find(image => image.preview);


    return <div id='reservation-details-container'>
        <div id="spot-info-container">
            <div id="preview-image-container">
                <img src={previewImage?.url}></img>
            </div>
            <div id="title-reviews-container">
                <h3>{currSpot?.name}</h3>
                <div id='small-star-rating'>
                    <i className="fas fa-star"></i>
                    <span style={{ 'marginRight': '4px', 'marginLeft': '1px' }}>{Object.values(spotReviews).length === 0 ? 'New' : parseFloat(currAvgRating).toFixed(1)}</span>
                    <span style={{ 'marginRight': '3px', 'marginLeft': '2px' }}>{Object.values(spotReviews).length > 0 && <span>&#x2022;</span>}</span>
                    {Object.values(spotReviews).length > 0 && Object.values(spotReviews).length === 1 && <span> {Object.values(spotReviews).length} Review</span>}
                    {Object.values(spotReviews).length > 0 && Object.values(spotReviews).length !== 1 && <span> {Object.values(spotReviews).length} Reviews</span>}
                </div>
                <h5>Hosted by {`${currSpot?.Owner.firstName} ${currSpot?.Owner.lastName}`}</h5>
            </div>
        </div>

        <div className='booking-details-horizontal-line'></div>

        <div id="price-details-container">
            <h2 id="price-details-header">Price Details</h2>
            <div className='price-detail'>
                <p>${currSpot?.price}/night x # nights</p>
                <p>$###.##</p>
            </div>
            <div className='price-detail'>
                <p>Cleaning fee</p>
                <p>$##.##</p>
            </div>
            <div className='price-detail'>
                <p>Matt&apos;s Flats fee</p>
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
}

export default ReservationDetails
