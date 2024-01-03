import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.thunkLoginUser({ credential, password }))
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
    return dispatch(sessionActions.thunkLoginUser({ credential: 'demo-lition', password: 'password' }))
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
      <form id="login-form" onSubmit={handleSubmit}>
        <h1 id='login-form-header'>Log In</h1>
        <div>
          {errors.credential && (
            <p className='error-message'>*{errors.credential}</p>
          )}
        </div>
        <label>
          <input
            id="username-input"
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Password */}
          <input
            id="password-input"
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* <div>
          {errors.credential && (
            <p className='error-message'>*{errors.credential}</p>
          )}
        </div> */}
        <button id="form-login-button" type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
      </form>
      <button id="demo-user-button" onClick={loginDemoUser}>Demo User</button>

    </div>
  );
}

export default LoginFormModal;
