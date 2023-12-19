// import {useDispatch} from 'react-redux';
// import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function SpotTile({ spot }) {
    // const dispatch = useDispatch();

    function goToSpotDetails() {
        console.log("MY SPOT: ", spot)
        // return <Navigate to={`/api/spots/${spot.id}`} />
    }

    return (
        <Link to={`/spots/${spot.id}`} className="spot-tile">
            <div onClick={goToSpotDetails} >
                <div className='spot-image'>
                    <img className='image' src={`../seed-spot-images/${spot.previewImage}`} />
                </div>
                <div className='spot-info'>
                    <div className="spot-city-state">
                        {`${spot.city}, ${spot.state}`}
                    </div>
                    <div className="spot-star-rating">
                        <i className="fas fa-star"></i>
                        {` ${spot.avgRating}`}
                    </div>
                    <div className="spot-price">
                        <span className="price-span">${spot.price}</span> night
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SpotTile;
