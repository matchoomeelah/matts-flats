import { useSelector } from 'react-redux';
import SpotTile from "./SpotTile";
import './SpotDisplay.css';

function SpotDisplay() {

  const allSpots = useSelector(state => state.spots.allSpots);

    return (
        <div id='spot-display-container'>
            {allSpots.map(spot => {
                return <SpotTile key={spot.id} spot={spot} />
            })}
        </div>
    )
}

export default SpotDisplay;
