
function SpotTile({ spot }) {
    console.log("MY SPOT:", spot);

    return (
        <div className="spot-tile">
            <div className='spot-image'>
                <img className='image' src={`./seed-spot-images/${spot.previewImage}`}/>
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
                    ${spot.price}
                </div>
            </div>
        </div>
    )
}

export default SpotTile;

//
// WHERE DO WE STORE IMAGES AND HOW CAN WE GET THEM
//
