import { useNavigate } from 'react-router-dom';

function SpotTile({ spot }) {
    const navigate = useNavigate();



    return (
        <div className="spot-tile" title={spot.name} onClick={() => navigate(`/spots/${spot.id}`)} >
            <div className='spot-image'>
                <img className='image' src={spot.previewImage} />
            </div>
            <div className='spot-info'>
                <div className='city-state-rating'>
                    <div className="spot-city-state">
                        {`${spot.city}, ${spot.state}`}
                    </div>
                    <div className="spot-star-rating">
                        <i className="fas fa-star"></i>
                        {spot.avgRating === 'New' ? 'New' : parseFloat(spot.avgRating).toFixed(1)}
                        {/* {Object.values(spotReviews).length === 0 ? 'New' : parseFloat(currAvgRating).toFixed(1)} */}
                    </div>
                </div>
                <span className="price-span">${Math.round(spot.price)}</span> <span className='night-span'>night</span>
            </div>
        </div>
    )
}

export default SpotTile;
