import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from "./matts-flats-logo-lowercase.png";

import './Navigation.css';
import NewSpotButton from './NewSpotButton';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
      <div id='logo-container'>
        <a href='/'>
          <img id='logo' src={logo} alt='mattsflats' />
        </a>
      </div>
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
