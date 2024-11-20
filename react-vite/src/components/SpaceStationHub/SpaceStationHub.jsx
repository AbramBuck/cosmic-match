import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import '../SpaceStationHub/SpaceStationHub.css';

function SpaceStationHub() {
    const User = useSelector((state) => state.session.user);
    console.log("USER INFO:////////", User);

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
                    </div>

                </div>
                <div className="top-stat-bar">
                    <h2>Commander {User.username}</h2>
                    <h2>Level: {level}</h2>
                    <h2>Gold: {User.gold}</h2>
                    <h2>Total Runs: {User.total_runs}</h2>
                    <Link to={"/mission"}>LAUNCH MISSION</Link>
                    <Link to={"/images"}>Upload Picture</Link>
                </div>
                <div className="bottom-planets-bar">
                </div>
            </div>
        </div>
    )
}

export default SpaceStationHub;