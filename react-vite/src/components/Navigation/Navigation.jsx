import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import ProfileButton from "./ProfileButton"
import { IoPlanet } from "react-icons/io5";
import { FaSdCard } from "react-icons/fa";
import { RiSpaceShipFill } from "react-icons/ri";
import "./Navigation.css"


function Navigation() {
  const User = useSelector((state) => state.session.user)

  return (
    <div className="topnav">
      <div>        
      {!User ? "" : 
      <>
        <NavLink to="/station">Go To Space Station Hub</NavLink>
        <NavLink to="/ships">< RiSpaceShipFill/> Ships</NavLink>
        <NavLink to="/planets">< IoPlanet/> Planets</NavLink>
        <NavLink to="/cards">< FaSdCard/> Cards</NavLink>
        </>
      } 
      </div>
      <div className="profile-button">        
        <ProfileButton />
      </div>

  </div>
  );
}

export default Navigation
