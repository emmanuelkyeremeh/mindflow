import React from "react";
import Modal from "./Modal";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  itemName = "",
  itemType = "item",
  warningMessage = "This action cannot be undone.",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small">
      <div className="confirmation-content">
        <div className="confirmation-icon">🗑️</div>
        <div className="confirmation-message">
          Are you sure you want to delete this {itemType}?
        </div>
        {itemName && (
          <div className="confirmation-details">
            <strong>"{itemName}"</strong> will be permanently removed.
          </div>
        )}
        <div className="confirmation-warning">⚠️ {warningMessage}</div>
      </div>

      <div className="modal-buttons">
        <button
          type="button"
          className="modal-button secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="modal-button danger"
          onClick={handleConfirm}
        >
          Delete {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
