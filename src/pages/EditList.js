import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchListById, updateList, fetchAllHttpCodes } from '../services/apiService';
import DogImage from '../components/DogImage';

const EditList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [allCodes, setAllCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [listData, codesData] = await Promise.all([
          fetchListById(id),
          fetchAllHttpCodes()
        ]);
        setList(listData);
        setAllCodes(codesData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleNameChange = (e) => {
    setList({ ...list, name: e.target.value });
  };

  const handleAddCode = (code) => {
    if (!list.codes.some(c => c.code === code.code)) {
      setList({
        ...list,
        codes: [
          ...list.codes,
          {
            code: code.code,
            imageUrl: code.imageUrl,
            description: code.description
          }
        ]
      });
    }
  };

  const handleRemoveCode = (codeToRemove) => {
    setList({
      ...list,
      codes: list.codes.filter(code => code.code !== codeToRemove.code)
    });
  };

  const handleSave = async () => {
    setEditing(false);
    try {
      await updateList(id, {
        name: list.name,
        codes: list.codes
      });
      navigate(`/lists/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update list');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!list) return null;

  return (
    <div className="edit-list-page">
      <div className="edit-list-header">
        <input
          type="text"
          value={list.name}
          onChange={handleNameChange}
          className="list-name-input"
        />
        <div className="edit-list-actions">
          <button onClick={() => setEditing(!editing)} className="btn-toggle-edit">
            {editing ? 'Cancel' : 'Add/Remove Codes'}
          </button>
          <button onClick={handleSave} className="btn-save">
            Save Changes
          </button>
        </div>
      </div>

      {editing && (
        <div className="all-codes-section">
          <h3>Available HTTP Codes</h3>
          <div className="all-codes-grid">
            {allCodes.map(code => (
              <div key={code.code} className="code-selector-item">
                <DogImage
                  code={code.code}
                  description={code.description}
                  imageUrl={code.imageUrl}
                />
                {list.codes.some(c => c.code === code.code) ? (
                  <button
                    onClick={() => handleRemoveCode(code)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddCode(code)}
                    className="btn-add"
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="current-codes-section">
        <h3>Current List ({list.codes.length} codes)</h3>
        <div className="dog-images-grid">
          {list.codes.map((code) => (
            <DogImage
              key={code.code}
              code={code.code}
              description={code.description}
              imageUrl={code.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditList;