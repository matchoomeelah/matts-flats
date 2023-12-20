// import SpotDisplay from "../SpotDisplay/SpotDisplay";
import ManageSpotTile from './ManageSpotTile';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetUserSpots } from '../../store/spots';

import './ManageSpotsDisplay.css';

function ManageSpotsDisplay() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const userSpots = useSelector(state => state.spots.userSpots);

    // Load in user spots
    useEffect(() => {
        try {
            dispatch(thunkGetUserSpots());
        } catch {
            return navigate('/');

        }
    }, [dispatch, navigate])


    // Make sure someone's logged in
    if (!sessionUser) {
        return navigate('/');
    }

    if (!userSpots) {
        return null;
    }

    return (
        <div>
            <div id='manage-heading'>
                <h1>Manage Your Spots</h1>
                <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>
            </div>

            <div id='spot-display-container'>
                {Object.values(userSpots).map(spot => {
                    return (
                        <ManageSpotTile key={spot.id} spot={spot} />
                    )
                })}
            </div>

        </div>
    )
}

export default ManageSpotsDisplay;
