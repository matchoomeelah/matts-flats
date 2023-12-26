import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.thunkSignup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          console.log(data.errors);
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  // Check if any fields are empty in form
  const hasEmptyField = () => {
    return email.length === 0 || username.length < 4 || firstName.length === 0 || lastName.length === 0 || password.length < 6 || confirmPassword.length === 0;
  }

  return (
    <div className='signup-form-container'>
      <h1 id='sign-up-form-header'>Sign Up</h1>
      <form id="sign-up-form" onSubmit={handleSubmit}>
        <label>
          <input
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        {errors.firstName && <p className='error-message'>*{errors.firstName}</p>}
        <label>
          <input
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        {errors.lastName && <p className='error-message'>*{errors.lastName}</p>}
        <label>
          <input
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        {errors.email && <p className='error-message'>*{errors.email}</p>}
        <label>
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        {errors.username && <p className='error-message'>*{errors.username}</p>}
        <label>
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        {errors.password && <p className='error-message'>*{errors.password}</p>}
        <label>
          <input
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        {errors.confirmPassword && (
          <p className='error-message'>*{errors.confirmPassword}</p>
        )}
        <button id='form-signup-button' type="submit" disabled={hasEmptyField()}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
