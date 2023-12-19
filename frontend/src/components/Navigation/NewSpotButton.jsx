import {Link} from 'react-router-dom'

function NewSpotButton({ user }) {
    if (!user) {
        return <></>;
    }

    return (
        <Link to='/spots/new'>
            <button id='new-spot-button'>
                Create a New Spot
            </button>
        </Link>
    );
}

export default NewSpotButton;
