import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';
import { thunkGetUserSpots } from '../../store/spots';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.thunkLoginUser({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          console.log("ERRORS: ", data.errors);
        }
        else {
          setErrors({ credential: "The provided credentials were invalid" });
        }
      });
  };

  const loginDemoUser = () => {
    return dispatch(sessionActions.thunkLoginUser({ credential: 'Demo-lition', password: 'password' }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          console.log("ERRORS: ", data.errors);
        }
        else {
          setErrors({ credential: "The provided credentials were invalid" });
        }
      });

  }

  return (
    <div className='login-form-container'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div>
          {errors.credential && (
            <p className='error-message'>*{errors.credential}</p>
          )}
        </div>
        <button type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      <button onClick={loginDemoUser}>Log in as Demo User</button>

    </div>
  );
}

export default LoginFormModal;
