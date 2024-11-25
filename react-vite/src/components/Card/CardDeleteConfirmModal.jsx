import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./EditModal.css";
import { thunkDeleteCard, thunkFetchCards } from '../../redux/cards';

function DeleteConfirmModal({ cardId }) {
const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (cardId) => {
    try {
      dispatch(thunkDeleteCard(cardId));
      dispatch(thunkFetchCards())
      closeModal();
    } catch (error) {

      throw new Error("Error when trying to delete a Notebook.");
    }
  };

  return (
    
    <div className='modal-content'>
      <h1>Confirm Delete</h1>
      <h2 className='subhead'>Are you sure you want to delete this Card?</h2>
      <div className='modal-buttons'>
        <button type="submit" onClick={() => closeModal()}>{"No (Keep Card)"}</button>
        <button className='del-btn' type='button' onClick={() => handleDelete(cardId)}>{"Yes (Delete Card)"}</button>
      </div>
    </div>
    
  );
}

export default DeleteConfirmModal;