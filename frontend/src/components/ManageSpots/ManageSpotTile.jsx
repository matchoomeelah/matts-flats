import { useNavigate } from 'react-router-dom';

import UpdateDeleteButtons from './UpdateDeleteButtons';
import './ManageSpotsDisplay.css';


function ManageSpotTile({ spot }) {
    const navigate = useNavigate();

    return (
        <div className="manage-spot-tile" title={spot.name} >
            <div className='spot-image' onClick={() => navigate(`/spots/${spot.id}`)}>
                <img className='image' src={spot.previewImage} />
            </div>
            <div className='spot-info' onClick={() => navigate(`/spots/${spot.id}`)} style={{'marginTop': '12px'}}>
                <div className='city-state-rating'>
                    <div className="spot-city-state">
                        {`${spot.city}, ${spot.state}`}
                    </div>
                    <div className="spot-star-rating">
                        <i className="fas fa-star"></i>
                        {spot.avgRating === 'New' ? 'New' : parseFloat(spot.avgRating).toFixed(1)}
                    </div>
                </div>
                <span className="price-span">${Math.round(spot.price)}</span> <span className='night-span'>night</span>
            </div>
            <UpdateDeleteButtons spotId={spot.id}/>
        </div>
    )
}

export default ManageSpotTile;
