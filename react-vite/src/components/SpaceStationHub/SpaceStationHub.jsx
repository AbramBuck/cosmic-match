import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
        <div>
            <h1>Click Below to Launch Mission</h1>
            <div>
                <h2>Commander {User.username}</h2>
                <h2>Level: {level}</h2>
                <h2>Gold: {User.gold}</h2>
                <h2>Total Runs: {User.total_runs}</h2>
            </div>
            <Link to={"/mission"}>LAUNCH MISSION</Link>
            <Link to={"/images"}>Upload Picture</Link>
        </div>
    )
}

export default SpaceStationHub;