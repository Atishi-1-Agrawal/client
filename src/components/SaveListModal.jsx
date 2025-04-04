import React, { useState } from 'react';

const SaveListModal = ({ isOpen, onClose, onSave, filter, codesCount }) => {
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(listName);
    setListName('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Save Current Search as List</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="modal-body">
          <p>
            You're saving {codesCount} HTTP {filter ? `(${filter}) ` : ''}codes
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="listName">List Name</label>
              <input
                type="text"
                id="listName"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="My HTTP Codes List"
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" onClick={onClose} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save List
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SaveListModal;