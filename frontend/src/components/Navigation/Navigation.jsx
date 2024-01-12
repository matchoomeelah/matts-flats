import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import ProfileButton from './ProfileButton';
import NewSpotButton from './NewSpotButton';
import logo from "./matts-flats-logo-lowercase.png";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
      <img id='logo' src={logo} alt='mattsflats' onClick={() => navigate('/')}/>
      {isLoaded && (
        <div id='user-menu-container'>
          <NewSpotButton user={sessionUser} />
          <ProfileButton id='profile-button' user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
