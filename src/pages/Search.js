import React, { useState, useEffect, useContext } from 'react';
import { fetchAllHttpCodes, filterHttpCodes } from '../services/apiService';
import DogImage from '../components/DogImage';
import SaveListModal from '../components/SaveListModal';

const Search = () => {
  const [codes, setCodes] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load all codes on initial render
  useEffect(() => {
    const loadCodes = async () => {
      setLoading(true);
      try {
        const data = await fetchAllHttpCodes();
        setCodes(data);
      } catch (err) {
        setError(err.message || 'Failed to load HTTP codes');
      } finally {
        setLoading(false);
      }
    };

    loadCodes();
  }, []);

  // Handle filter changes
  useEffect(() => {
    if (!filter) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await filterHttpCodes(filter);
        setCodes(data);
      } catch (err) {
        setError(err.message || 'Failed to filter HTTP codes');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filter]);

  const handleSaveList = async (name) => {
    try {
      // Prepare list data
      const listData = {
        name,
        filter,
        codes: codes.map(code => ({
          code: code.code,
          imageUrl: code.imageUrl,
          description: code.description
        }))
      };

      // Save the list (API call would be made here)
      // await createList(listData);
      
      // Close modal and reset filter
      setShowModal(false);
      setFilter('');
      
      // Show success message
      alert(`List "${name}" saved successfully!`);
    } catch (err) {
      setError(err.message || 'Failed to save list');
    }
  };

  return (
    <div className="search-page">
      <h1>HTTP Status Codes with Dogs</h1>
      
      <div className="search-controls">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter codes (e.g., 404, 2xx, 5xx)"
          className="search-input"
        />
        
        {filter && (
          <button 
            onClick={() => setShowModal(true)} 
            className="btn-save-list"
          >
            Save as List
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="dog-images-grid">
          {codes.map((code) => (
            <DogImage
              key={code.code}
              code={code.code}
              description={code.description}
              imageUrl={code.imageUrl}
            />
          ))}
        </div>
      )}

      <SaveListModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveList}
        filter={filter}
        codesCount={codes.length}
      />
    </div>
  );
};

export default Search;