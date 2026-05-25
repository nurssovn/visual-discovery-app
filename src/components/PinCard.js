import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import deleteIconPng from '../assets/delete-icon.png';

function PinCard({ id, image, saved, canDelete = true, onDelete, onToggleSave }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSaveClick = async () => {
    await onToggleSave(id);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    await onDelete(id);
  };

  return (
    <div className="pin-card">
      <Link to={`/pin/${id}`}>
        <img src={image} alt="Pin" />
      </Link>

      <button
        type="button"
        className={`save-btn ${saved ? 'saved' : ''}`}
        onClick={handleSaveClick}
      >
        {saved ? 'Сохранено' : 'Сохранить'}
      </button>

      {canDelete && (
        <button
          type="button"
          className="delete-btn"
          onClick={() => setShowConfirm(true)}
          title="Удалить пин"
        >
          <img src={deleteIconPng} alt="Удалить" width="18" style={{ display: 'block' }} />
        </button>
      )}

      {showConfirm && (
        <ConfirmDialog
          title="Удалить пин?"
          message="Это действие нельзя отменить. Пин будет удалён для всех пользователей."
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default PinCard;
