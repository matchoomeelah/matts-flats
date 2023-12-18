import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import OpenModalMenuItem from './OpenModalMenuItem';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogoutUser());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button id='profile-button' onClick={toggleMenu}>
        <i id='menu-bars' className="fas fa-bars"></i>
        <i id='profile-icon' className="fas fa-user-circle fa-lg" />
      </button>
      <div id='dropdown-menu' className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>Hello, {user.username}!</div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
            <div>
              <button onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <div className='signup-menu-item'>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div className='login-menu-item'>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
