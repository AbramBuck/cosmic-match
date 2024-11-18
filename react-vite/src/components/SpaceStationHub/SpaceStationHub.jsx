import { Link } from "react-router-dom";


function SpaceStationHub() {


    return (
        <div>
            <h1>Click Below to Launch Mission</h1>
            <Link to={"/mission"}>LAUNCH MISSION</Link>
        </div>
    )
}

export default SpaceStationHub;