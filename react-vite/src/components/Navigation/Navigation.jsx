import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileButton from "./ProfileButton"
import "./Navigation.css"


function Navigation() {
  const User = useSelector((state) => state.session.user)

  return (
    <div className="topnav">
      <div>        
      {!User ? "" : <NavLink to="/">Space Station Hub</NavLink>} 
      </div>
      <div className="profile-button">        
        <ProfileButton />
      </div>

  </div>
  );
}

export default Navigation
