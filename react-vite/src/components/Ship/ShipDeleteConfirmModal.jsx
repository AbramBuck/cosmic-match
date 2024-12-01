import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "../Card/EditModal.css";
import {  deleteASHIP, fetchShips } from '../../redux/ship';
import { RiSpaceShipFill } from "react-icons/ri";


function ShipDeleteConfirmModal({ shipId }) {
const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (shipId) => {
    try {
      await dispatch(deleteASHIP(shipId));
      await dispatch(fetchShips())
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
          <h2 className='subhead'>Are you sure you want to destory this Ship? <RiSpaceShipFill /></h2>
          <div className='modal-buttons'>
            <button type="submit" onClick={() => closeModal()}>{"No (Keep Ship)"}</button>
            <button className='del-btn' type='button' onClick={() => handleDelete(shipId)}>{"Yes (Delete Ship)"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipDeleteConfirmModal;