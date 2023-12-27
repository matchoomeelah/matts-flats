import { useSelector, useDispatch } from 'react-redux';
import SpotTile from "./SpotTile";
import { actionClearCurrSpot } from '../../store/spots';
import './SpotDisplay.css';

function SpotDisplay() {
    // Select all spots from state
    const allSpots = useSelector(state => state.spots.allSpots);

    // Clear the currSpot state
    const dispatch = useDispatch();
    dispatch(actionClearCurrSpot());

    // Map through the spots, rendering a SpotTile for each
    return (
        <div id='landing-spot-display-container'>
            {Object.values(allSpots).map(spot => {
                return <SpotTile key={spot.id} spot={spot} />
            })}
        </div>
    )
}

export default SpotDisplay;
