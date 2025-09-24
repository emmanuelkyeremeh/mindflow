import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const NodeEditModal = ({ isOpen, onClose, onSave, nodeLabel = "" }) => {
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLabel(nodeLabel);
    }
  }, [isOpen, nodeLabel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label.trim()) {
      onSave(label.trim());
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Node Label"
      size="small"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="node-label">Node Label</label>
          <input
            id="node-label"
            type="text"
            className="form-input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter node label"
            autoFocus
            maxLength={100}
          />
          <div className="form-help">
            Press Enter to save, or click Save button
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
            type="submit"
            className="modal-button primary"
            disabled={!label.trim()}
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NodeEditModal;
