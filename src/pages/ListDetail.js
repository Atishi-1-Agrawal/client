import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchListById } from '../services/apiService';
import DogImage from '../components/DogImage';

const ListDetail = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadList = async () => {
      setLoading(true);
      try {
        const data = await fetchListById(id);
        setList(data);
      } catch (err) {
        setError(err.message || 'Failed to load list');
      } finally {
        setLoading(false);
      }
    };

    loadList();
  }, [id]);

  return (
    <div className="list-detail-page">
      {loading ? (
        <div className="loading">Loading list...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : list ? (
        <>
          <div className="list-header">
            <h1>{list.name}</h1>
            {list.filter && (
              <div className="list-filter">Original filter: {list.filter}</div>
            )}
            <div className="list-meta">
              Created: {new Date(list.createdAt).toLocaleDateString()}
            </div>
          </div>

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
        </>
      ) : null}
    </div>
  );
};

export default ListDetail;