import { Link } from 'react-router-dom';

function SpotTile({ spot }) {


    return (
        <div className="spot-tile">
            <Link to={`/spots/${spot.id}`}>
                <div className='spot-image'>
                    <img className='image' src={spot.previewImage} />
                </div>
            </Link>
            <Link to={`/spots/${spot.id}`} style={ {textDecoration: 'none' }}>
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
            </Link>
        </div>
    )
}

export default SpotTile;
