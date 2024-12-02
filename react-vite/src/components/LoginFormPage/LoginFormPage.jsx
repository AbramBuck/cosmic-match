import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import { PiPlanetBold } from "react-icons/pi";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    
    setEmail('demo@aa.io')
    setPassword('password')

    const user = {
      email:'demo@aa.io',
      password:'password'
    };
    await dispatch(thunkLogin(user));
    navigate("/station");
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/station");
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page-glass">
      <div className="logo-login"><PiPlanetBold /></div>
        <h1 className="title-login">Cosmic Match</h1>
        <h2>Log In </h2>
        {errors.length > 0 &&
          errors.map((message) => <p key={message}>{message}</p>)}
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              className="form-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p>{errors.email}</p>}
          <label>
            Password
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p>{errors.password}</p>}
          <div className="login-btns">
            <button type="submit">Log In</button>
            <button className="demo-user-login" onClick={handleDemoLogin}>Log In as Demo User</button>
          </div>
          <OpenModalButton buttonText="Sign Up"  modalComponent={<SignupFormModal />}/>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
