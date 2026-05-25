import React from 'react';

function ConfirmDialog({ title, message, confirmLabel = 'Удалить', onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-card" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button type="button" className="btn-profile-action" onClick={onCancel}>
            Отмена
          </button>
          <button type="button" className="confirm-danger-btn" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
