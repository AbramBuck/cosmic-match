import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CreateShipForm from '../SpaceStationHub/CreateShipForm';
import { fetchShips } from "../../redux/ship";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import '../SpaceStationHub/SpaceStationHub.css';
import { thunkShipUpdate } from "../../redux/ship";
import { thunkUpdate } from "../../redux/session";
import { thunkAuthenticate } from "../../redux/session";
import { getAllPlanets } from "../../redux/planet";
import { FaDailymotion } from "react-icons/fa";
import { GiSpaceship } from "react-icons/gi";

function SpaceStationHub() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => state.session.user);
    const Ships = useSelector((state) => state.ships.ships);
    const planets = useSelector((state) => state.planets.planets)
    const [level, setLevel] = useState(1);
    const [shipLevel, setShipLevel] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [currentShip, setCurrentShip] = useState([]);
    const [changeShip, setChangeShip] = useState(1)
    const [missionDeck, setMissionDeck] = useState(1);

    if (!User) navigate(`/login`);


    useEffect(() => {
        dispatch(fetchShips())
      },[dispatch]);

      useEffect(() => { 
        dispatch(getAllPlanets())
    }, [dispatch], planets);

      useEffect(() => {
        if (Ships && Ships.length && User && User.current_ship) {
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
      if (Ships && currentShip && currentShip.runs_completed) {
        if (currentShip.runs_completed < 20) {
            setShipLevel(0)
        } else {
        setShipLevel(Math.floor(currentShip.runs_completed / 20))
        }
      }
  }, [Ships, User.current_ship]);
    

  const handleLaunch = () => {
      dispatch(thunkUpdate({mission_deck: missionDeck}))
      navigate("/mission/custom");
  }

  const handleShipChange = () => {
    dispatch(thunkUpdate({current_ship: changeShip}))
    dispatch(fetchShips())
  }

  const handleShieldUpgrade = async () => {
    if (User.gold >= 500) {
      const updatedGold = User.gold - 500;
      const updatedShields = currentShip.shields + 1;
  
      try {
        await dispatch(thunkUpdate({ gold: updatedGold }));
        await dispatch(thunkShipUpdate(currentShip.id, { shields: updatedShields }));
        await dispatch(fetchShips()); 
  
        console.log("Shields Upgraded!!", "GOLD:", updatedGold);
      } catch (error) {
        console.error("Error upgrading shields:", error);
      }
    } else {
      alert("You don't have enough gold to buy that upgrade");
    }
  };

  const handleFuelUpgrade = async () => {
    if (User.gold >= 500) {
      
      const updatedGold = User.gold -= 500;
      const updatedFuel = currentShip.fuel += 1;
      const updates = { fuel: updatedFuel };
  
      try {
        
        await dispatch(thunkUpdate({ gold: updatedGold }));
        await dispatch(thunkShipUpdate(currentShip.id, updates));
  
        console.log("Fuel Upgraded!!", "GOLD:", updatedGold);
      } catch (error) {
        console.error("Error upgrading fuel:", error);
      }
    } else {
      alert("You don't have enough gold to buy that upgrade");
    }
  };

    return (
        <div className="hub-page-wrapper">
            <div className="hub-title-area"><h1 className="hub-title">SPACE STATION HUB</h1></div>
            <div className="hub-page-grid">
                <div className="left-ship-bar">
                <h2>Current Ship</h2>
                    { Ships && currentShip && currentShip.image_url ? <img className="current-ship-img" src={currentShip.image_url}alt="current ship" /> : <div className="ship-placeholder"><GiSpaceship /></div>} 
                    <div className="ship-info-div">
                        <h2>{Ships && currentShip ? currentShip.name : "Create a Ship to Begin"}</h2>
                        <h2>Ship Level: {shipLevel}  </h2>
                        <h2>Shields: {Ships && currentShip && currentShip.shields ? currentShip.shields : 0}</h2><button className="shield-upgrade-btn" onClick={handleShieldUpgrade}>+1 Shields | 500$</button>
                        <h2>Fuel: {Ships && currentShip && currentShip.fuel ? currentShip.fuel : 0}</h2><button className="fuel-upgrade-btn" onClick={handleFuelUpgrade}>+1 Fuel | 500$</button>
                        <h2>Runs: {Ships && currentShip && currentShip.runs_completed ? currentShip.runs_completed : 0 }</h2>
                        <div className="button-div">
                        <div className="create-ship-button"><OpenModalButton buttonText="Create A Ship"  modalComponent={<CreateShipForm User={User} />}/></div>
                    </div> 
                    <div className="stat-bar-ship-select">
                      {Ships && Ships.length && currentShip ?
                    <form >
                        <div className="form-group">
                            <label htmlFor="card_id"></label>
                                <select
                                id="ship_id"
                                value={changeShip}
                                onChange={(e) => setChangeShip(e.target.value)}
                                title="Change your ship"
                                required
                                >
                                <option value="">Change Your Current Ship</option>
                                {Ships.map((ship) => (
                                    <option key={ship.id} value={ship.id}>
                                    {ship.name } | LVL: { Math.floor(ship.runs_completed / 20)}
                                    </option>
                                ))}
                                </select>
                                <button onClick={handleShipChange}>Lock In</button>
                        </div>
                    </form> : ""}
                    </div>
                  </div>

                </div>
                <div className="top-stat-bar">
                    <h2 className="cpt-name-hub">Commander {User.username}</h2>
                    <h2 className="stat-bar-stat-lvl">Level: {level}</h2>
                    <h2 className="stat-bar-stat-gold">Credits: {User.gold}</h2>
                    <h2 className="stat-bar-stat-runs">Total Runs: {User.total_runs}</h2>
                    <h2 className="stat-bar-select-text" title="Custom missions explore planets that you created">Choose Custom Mission Location:</h2>
                    <div className="stat-bar-planet-select">
                    <form >
                        <div className="form-group">
                            <label htmlFor="card_id"></label>
                                <select
                                id="card_id"
                                value={missionDeck}
                                onChange={(e) => setMissionDeck(e.target.value)}
                                title="Custom missions explore planets that you created"
                                required
                                >
                                <option value="">Select a Created Planet</option>
                                {planets.map((planet) => (
                                    <option key={planet.id} value={planet.id}>
                                    {planet.name} 
                                    </option>
                                ))}
                                </select>
                        </div>
            </form>
                    </div>
                    <Link to={"/planets"} className="stat-bar-btn-1">Manage Planets</Link>
                    <Link to={"/cards"} className="stat-bar-btn-2">Manage Cards</Link>
                    <Link onClick={handleLaunch}  className="stat-bar-btn-3">CUSTOM MISSION</Link>
                    <Link to={"/mission"}  className="stat-bar-btn-4">STANDARD MISSION</Link>
                    
                </div>
                <div className="bottom-planets-bar">
                </div>
            </div>
        </div>
    )
}

export default SpaceStationHub;