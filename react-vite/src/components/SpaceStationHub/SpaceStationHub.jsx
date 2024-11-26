import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CreateShipForm from '../SpaceStationHub/CreateShipForm';
import { fetchShips } from "../../redux/ship";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import '../SpaceStationHub/SpaceStationHub.css';
import { thunkShipUpdate } from "../../redux/ship";
import { thunkUpdate } from "../../redux/session";
import { getAllPlanets } from "../../redux/planet";

function SpaceStationHub() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => state.session.user);
    const Ships = useSelector((state) => state.ships.ships);
    const planets = useSelector((state) => state.planets.planets)
    const [level, setLevel] = useState(1);
    const [shipLevel, setShipLevel] = useState(1);
    const [showMenu, setShowMenu] = useState(false);
    const [currentShip, setCurrentShip] = useState([]);
    const [missionDeck, setMissionDeck] = useState(1);

    if (!User) navigate(`/login`);


    useEffect(() => {
        dispatch(fetchShips())
      },[dispatch]);

      useEffect(() => { 
        dispatch(getAllPlanets())
    }, [dispatch], planets);

      useEffect(() => {
        if (Ships.length && User.current_ship) {
            const foundShip = Ships.find((e) => e.id === User.current_ship)
            setCurrentShip(foundShip || null);
        }
    }, [Ships, User]);

    const updateUserInfo = async () => {
      console.log("FIRED OFF Update User Info")
      const amount = User.gold += 150
      const shipId = currentShip.id
      const userUpdates = {
        gold: User.gold += gold,
        total_runs: User.total_runs += turns
      }

      await dispatch(thunkUpdate(userUpdates))
      await dispatch(thunkUpdate(amount))
     
    };


    const updateShipInfo = async () => {
      console.log("FIRED OFF Update Ship Info")
      const updates = { runs_completed: currentShip.runs_completed += 20, }
      const shipId = currentShip.id
     
      await dispatch(thunkShipUpdate(shipId, updates))
     
    };


    const toggleMenu = (e) => {
        e.stopPropagation();
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


    useEffect(() => {
        if (User.total_runs < 20) {
            setLevel(0);
        } else {
            setLevel(Math.floor(User.total_runs / 20));
        }
    }, [User.total_runs]);

    useEffect(() => {
      if (currentShip && currentShip.runs_completed < 20) {
        setShipLevel(0)
    } else {
        setShipLevel(Math.floor(currentShip.runs_completed / 20))
    }
  }, [Ships, User.current_ship]);
    

  const handleLaunch = () => {
      dispatch(thunkUpdate({mission_deck: missionDeck}))
      console.log("Post-button Press::",User.mission_deck)
      navigate("/mission");
  }
    return (
        <div className="hub-page-wrapper">
            <div className="hub-title-area"><h1 className="hub-title">SPACE STATION HUB</h1></div>
            <div className="hub-page-grid">
                <div className="left-ship-bar">
                    <h2>Current Ship</h2>
                    <img className="current-ship-img" src="https://img.freepik.com/premium-photo/spaceship-flying-sky-with-full-moon-background-generative-ai_902338-27035.jpg?uid=R12082531&ga=GA1.1.2099741159.1700972044&semt=ais_hybrid" alt="current ship" />
                    <div className="ship-info-div">
                        <h2>{currentShip.name}</h2>
                        <h2>Ship Level: {shipLevel}  </h2>
                        <h2>Shields: {currentShip.shields}</h2>
                        <h2>Fuel: {currentShip.fuel}</h2>
                        <h2>Runs: {currentShip.runs_completed}</h2>
                        <div className="button-div">
                        <OpenModalButton buttonText="Create A Ship"  modalComponent={<CreateShipForm User={User} />}/>
                        </div> 
                    </div>

                </div>
                <div className="top-stat-bar">
                    <h2 className="cpt-name-hub">Commander {User.username}</h2>
                    <h2 className="stat-bar-stat-lvl">Level: {level}</h2>
                    <h2 className="stat-bar-stat-gold">Credits: {User.gold}</h2>
                    <h2 className="stat-bar-stat-runs">Total Runs: {User.total_runs}</h2>
                    <h2 className="stat-bar-select-text">Choose a Planet to Explore:</h2>
                    <div className="stat-bar-planet-select">
                    <form >
                        <div className="form-group">
                            <label htmlFor="card_id"></label>
                                <select
                                id="card_id"
                                value={missionDeck}
                                onChange={(e) => setMissionDeck(e.target.value)}
                                required
                                >
                                <option value="">Select a Planet</option>
                                {planets.map((planet) => (
                                    <option key={planet.id} value={planet.id}>
                                    {planet.name} 
                                    </option>
                                ))}
                                </select>
                        </div>
            </form>
                    </div>
                    <Link to={"/images"} className="stat-bar-btn-1">Upload Picture</Link>
                    <Link to={"/planets"} className="stat-bar-btn-2">Manage Planets</Link>
                    <Link to={"/cards"} className="stat-bar-btn-3">Manage Cards</Link>
                    <button onClick={handleLaunch} className="stat-bar-btn-4">LAUNCH MISSION</button>
                    
                </div>
                <div className="bottom-planets-bar">
                </div>
            </div>
        </div>
    )
}

export default SpaceStationHub;