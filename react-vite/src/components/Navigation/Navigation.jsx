import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="topnav">
      <div>        
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="profile-button">        
        <ProfileButton />
      </div>

  </div>
  );
}

export default Navigation;
