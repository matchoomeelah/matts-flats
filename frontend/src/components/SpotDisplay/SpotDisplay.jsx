import { useSelector } from 'react-redux';
import SpotTile from "./SpotTile";
import './SpotDisplay.css';

function SpotDisplay() {
    // Select all spots from state
    const allSpots = useSelector(state => state.spots.allSpots);

    // Map through the spots, rendering a SpotTile for each
    return (
        <div id='spot-display-container'>
            {Object.values(allSpots).map(spot => {
                return <SpotTile key={spot.id} spot={spot} />
            })}
        </div>
    )
}

export default SpotDisplay;
