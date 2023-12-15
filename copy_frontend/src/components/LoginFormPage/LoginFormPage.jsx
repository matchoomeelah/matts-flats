import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { thunkLoginUser } from "../../store/session";


function LoginFormPage() {
    // Login form variables
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    // If a user is currently logged in, navigate to welcome
    if (sessionUser) return <Navigate to="/" replace={true} />;

    async function onSubmit(e) {
        // Prevent refresh
        e.preventDefault();

        // const userCredentials = {
        //     credential,
        //     password
        // };

        setErrors({});

        return dispatch(thunkLoginUser({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) {
                    setErrors(data.errors);
                }
                else {
                    setErrors({unauthorized: "Your username or password is incorrect"});
                }
            }
        );
    }


    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor='credential'>
                    Username:
                    <input
                        id='credential'
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                    />
                </label>
                <div>{errors.credential}</div>
                <label htmlFor='password'>
                    Password:
                    <input
                        id='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <div>{errors.password}</div>
                <div>{errors.unauthorized}</div>
                <button>
                    Log In
                </button>
            </form>
        </div>
    )
}


export default LoginFormPage;
