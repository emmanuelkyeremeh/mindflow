import React from "react";
import Modal from "./Modal";

const NodeDeleteModal = ({ isOpen, onClose, onConfirm, nodeLabel = "" }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Node" size="small">
      <div className="confirmation-content">
        <div className="confirmation-icon">🗑️</div>
        <div className="confirmation-message">
          Are you sure you want to delete this node?
        </div>
        {nodeLabel && (
          <div className="confirmation-details">
            <strong>"{nodeLabel}"</strong> will be permanently removed along
            with all its connections.
          </div>
        )}
        <div className="confirmation-warning">
          ⚠️ This action cannot be undone.
        </div>
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
          Delete Node
        </button>
      </div>
    </Modal>
  );
};

export default NodeDeleteModal;
