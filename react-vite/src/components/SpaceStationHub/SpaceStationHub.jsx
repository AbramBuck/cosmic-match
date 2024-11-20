import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CreateShipForm from '../SpaceStationHub/CreateShipForm';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import '../SpaceStationHub/SpaceStationHub.css';


function SpaceStationHub() {
    const User = useSelector((state) => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    console.log("USER INFO:////////", User);

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
        dispatch(sessionActions.logout());
        closeMenu();
        navigate('/');
      };


    let level = 1;

    if (User.total_runs < 20) {
        level = 0;
    } else {
        level = User.total_runs / 20
    }

    return (
        <div className="hub-page-wrapper">
            <div className="hub-title-area"><h1 className="hub-title">SPACE STATION HUB</h1></div>
            <div className="hub-page-grid">
                <div className="left-ship-bar">
                    <h2>Current Ship</h2>
                    <img className="current-ship-img" src="https://img.freepik.com/premium-photo/spaceship-flying-sky-with-full-moon-background-generative-ai_902338-27035.jpg?uid=R12082531&ga=GA1.1.2099741159.1700972044&semt=ais_hybrid" alt="current ship" />
                    <div className="ship-info-div">
                        <h2>Ship Name Here </h2>
                        <h2>Level: </h2>
                        <h2>Shields: </h2>
                        <h2>Fuel: </h2>
                        <div className="button-div">
                        <OpenModalButton buttonText="Create A Ship"  modalComponent={<CreateShipForm User={User} />}/>
                        </div> 
                    </div>

                </div>
                <div className="top-stat-bar">
                    <h2 className="cpt-name-hub">Commander {User.username}</h2>
                    <h2 className="stat-bar-stat-lvl">Level: {level}</h2>
                    <h2 className="stat-bar-stat-gold">Gold: {User.gold}</h2>
                    <h2 className="stat-bar-stat-runs">Total Runs: {User.total_runs}</h2>
                    <Link to={"/images"} className="stat-bar-btn-1">Upload Picture</Link>
                    <Link to={"/mission"} className="stat-bar-btn-2">LAUNCH MISSION</Link>
                    <Link to={"/mission"} className="stat-bar-btn-3">LAUNCH MISSION</Link>
                    <Link to={"/mission"} className="stat-bar-btn-4">LAUNCH MISSION</Link>
                    
                </div>
                <div className="bottom-planets-bar">
                </div>
            </div>
        </div>
    )
}

export default SpaceStationHub;