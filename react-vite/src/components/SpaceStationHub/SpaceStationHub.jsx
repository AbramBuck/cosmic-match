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
import { thunkFetchCards } from "../../redux/cards";
import { FaDailymotion } from "react-icons/fa";
import { GiSpaceship } from "react-icons/gi";
import { IoPlanet } from "react-icons/io5";
import { FaSdCard } from "react-icons/fa";
import '../Planet/ManagePlanets.css'


function SpaceStationHub() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => state.session.user);
    const Ships = useSelector((state) => state.ships.ships);
    const planets = useSelector((state) => state.planets.planets)
    const cards = useSelector((state) => state.cards.cards )
    const [level, setLevel] = useState(1);
    const [shipLevel, setShipLevel] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [currentShip, setCurrentShip] = useState([]);
    const [changeShip, setChangeShip] = useState(1)
    const [missionDeck, setMissionDeck] = useState(null);

    if (!User) navigate(`/login`);

    const cardsOnPlanet = cards.reduce((acc, card) => {
      const id = card.planet_id;
      acc[id] = (acc[id] || 0) + 1; 
      return acc;
    }, {});

    useEffect(() => {
        dispatch(fetchShips())
      },[dispatch]);

      useEffect(() => { 
        dispatch(getAllPlanets())
    }, [dispatch], planets);

    useEffect(() => { 
      dispatch(thunkFetchCards())
  }, [dispatch], cards);

      useEffect(() => {
        if (Ships && Ships.length && User && User.current_ship) {
            const foundShip = Ships.find((e) => e.id === User.current_ship)
            setCurrentShip(foundShip || null);
        }
    }, [Ships, User]);

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
      if (User && User.total_runs) {
            
          if (User.total_runs < 20){
            setLevel(0);
          } else {
            setLevel(Math.floor(User.total_runs / 20));
          }
      }
    }, [User]);

    useEffect(() => {
      if (Ships && currentShip && currentShip.runs_completed) {
        if (currentShip.runs_completed < 20) {
            setShipLevel(0)
        } else {
        setShipLevel(Math.floor(currentShip.runs_completed / 20))
        }
      }
  }, [Ships, User]);


  const handleLaunch = async () => {
    const planetCheck = planets?.filter((planet) => planet.id == missionDeck)
    const cardsAtMax = cardsOnPlanet[missionDeck] == planetCheck[0]?.deck_size

      await dispatch(thunkUpdate({mission_deck: missionDeck}))
      if (missionDeck === null) {
        alert("Select a Planet to Run Custom Missions")
      }else if ( missionDeck !== null && cardsAtMax === false) {
        alert("Your planet needs a full deck to use in a Custom Mission")
      } else {
        navigate("/mission/custom");
      }
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
                                <button onClick={handleShipChange}>Change</button>
                        </div>
                    </form> : ""}
                    </div>
                  </div>

                </div>
                <div className="top-stat-bar">
                    <h2 className="cpt-name-hub">Commander {User ? User.username : " "}</h2>
                    <h2 className="stat-bar-stat-lvl">Level: {level}</h2>
                    <h2 className="stat-bar-stat-gold">Credits: {User ? User.gold : " "}</h2>
                    <h2 className="stat-bar-stat-runs">Total Runs: {User ? User.total_runs : " "}</h2>
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
                                    {planet.name} <FaSdCard />: { cardsOnPlanet[planet.id] ? cardsOnPlanet[planet.id] : 0 } | {planets ? planet.deck_size : ""}
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
                  <div className="planets-area-station">
                  <h1 className="recent-planets-heading">Recent Planets</h1>
                  {!planets ? <h1 className="no-planets-test">You don't have any planets...</h1> : ""}
                { planets.slice(0,3).map((planet) => (
                  <div className="planet-instance-station" key={planet.id} style={{
                    background: `linear-gradient(to bottom, rgba(17, 85, 133, 0.5), rgba(17, 85, 133, 0.8)), url(${planet.image_url})`,backgroundSize: 'cover',}}>
                    <div className="planet-title ubuntu-regular"><IoPlanet />{planet.name}</div>
                    <Link to={`/planets/${planet.id}`}>
                    <div className="planet-crop-container"><img src={planet.image_url} title="Click to visit Planet"></img></div>
                    </Link>     
                    <div className="manage-planet-title">
                      <h3 className="card-count-icon"><FaSdCard />: { cardsOnPlanet[planet.id] ? cardsOnPlanet[planet.id] : 0 } | {planets ? planet.deck_size : ""} </h3>
                    </div>
                  </div>
                ))}
                </div>
                </div>
            </div>
        </div>
    )
}

export default SpaceStationHub;