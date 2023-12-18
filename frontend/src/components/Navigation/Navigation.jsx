// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from "./matts-flats-logo-lowercase.png";

import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
      <div>
        <a href='/'>
          <img id='logo' src={logo} alt='mattsflats' />
        </a>
      </div>
      {isLoaded && (
        <ProfileButton id='profile-button' user={sessionUser} />
      )}
    </div>
  );
}

export default Navigation;
