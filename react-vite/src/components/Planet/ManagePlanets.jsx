import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllPlanets } from "../../redux/planet";
import { deleteAPLANET } from "../../redux/planet";
import { IoPlanet } from "react-icons/io5";
// import OpenModalButton from "./OpenModalButton";
// import DeleteNotebookConfirmModal from "./DeleteNotebookConfirmModal";
// import EditNotebookModal from "./EditNotebookModal";



function ManagePlanets() {
  const dispatch = useDispatch();
  const [error, setErrors] = useState(null);
  // const user = useSelector((store) => store.session.user);
  const planets = useSelector((state) => state.planets.planets);
//   const notes = useSelector((state) => state.notes.notes);
  
//   console.log("Planets:///////",planets)

//   const notesInNotebook = notes.reduce((acc, note) => {
//     const id = note.notebook_id;
//     acc[id] = (acc[id] || 0) + 1; 
//     return acc;
//   }, {});

//   console.log("NotesInNotebook:///////",notesInNotebook)
  
//   const alertDelete = () =>{
//     alert('You Cannot Delete a Notebook that has Notes')
//   }


const handleDelete = async (e) => {
    e.preventDefault();
    try {
        await dispatch(deleteAPLANET(4))
        await dispatch(getAllPlanets())
        // window.location.href = `/planets/manage`;
    } catch (error) {
        setErrors({ submission: "Error when trying to create a planet." })
    }
};


  useEffect(() => { 
    dispatch(getAllPlanets())
    // dispatch(thunkFetchNotes());
}, [dispatch], planets);

  
  return (
    <div className="page-wrapper">
      {/* NavBar End */}
      <div className="planets-area">
            <h1 className="manage-planet-header">PLANETS</h1>
            <Link to={"/planets/new"}>Create a Planet</Link>
            <div className="planets-page-populated-area">
              {planets.map((planet) => (
                <div className="planet-instance" key={planet.id}>
                  <h3>{planet.name}</h3>
                  <Link to={`/planets/${planet.id}`}>
                    <h1 className="planet-icon"><IoPlanet /></h1>
                  </Link>
                  <div className="manage-planet-title">
                    
                    {/* <h3>Cards:{ cardsInPlanet[planet.id] ? cardsInPlanet[planet.id] : 0 } </h3> */}
                  </div>
                  <div className="edit-delete-btn-area">
                    {/* <OpenModalButton buttonText="Edit"  modalComponent={<EditPlanetModal planet={planet}/>}/>
                    {notesInPlanet[planet.id] ? <button onClick={alertDelete}>Delete</button> : <OpenModalButton buttonText="Delete"  modalComponent={<DeletePlanetConfirmModal planetId={planet.id}/>}/>}
                     */}
                    <button onClick={handleDelete}>DELETE</button>
                  </div>                
                </div>
              ))}
              </div>
      </div>
    </div>

)
}
export default ManagePlanets;
