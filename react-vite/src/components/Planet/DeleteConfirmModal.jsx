import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./EditModal.css";
import { deleteAPLANET, getAllPlanets } from '../../redux/planet';

function DeleteConfirmModal({ planetId }) {
const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (planetId) => {
    try {
      dispatch(deleteAPLANET(planetId));
      dispatch(getAllPlanets())
      closeModal();
    } catch (error) {

      throw new Error("Error when trying to delete a Notebook.");
    }
  };

  return (
    <div className="login-modal-wrapper">
      <div className="login-modal-glass">
        <div className='modal-content'>
          <h1>Confirm Delete</h1>
          <h2 className='subhead'>Are you sure you want to destroy this planet?</h2>
          <div className='modal-buttons'>
            <button type="submit" onClick={() => closeModal()}>{"No (Spare Planet)"}</button>
            <button className='del-btn' type='button' onClick={() => handleDelete(planetId)}>{"Yes (Delete Planet)"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;