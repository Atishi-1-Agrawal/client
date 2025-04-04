import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserLists, deleteList } from '../services/apiService';
import { AuthContext } from '../context/AuthContext';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadLists = async () => {
      setLoading(true);
      try {
        const data = await fetchUserLists();
        setLists(data);
      } catch (err) {
        setError(err.message || 'Failed to load your lists');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadLists();
    }
  }, [user]);

  const handleDelete = async (listId) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      try {
        // await deleteList(listId);
        setLists(lists.filter(list => list._id !== listId));
      } catch (err) {
        setError(err.message || 'Failed to delete list');
      }
    }
  };

  return (
    <div className="lists-page">
      <div className="lists-header">
        <h1>My HTTP Code Lists</h1>
        <Link to="/search" className="btn-new-list">
          Create New List
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading your lists...</div>
      ) : lists.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any saved lists yet.</p>
          <Link to="/search" className="btn-primary">
            Create your first list
          </Link>
        </div>
      ) : (
        <div className="lists-grid">
          {lists.map((list) => (
            <div key={list._id} className="list-card">
              <div className="list-card-header">
                <h3>
                  <Link to={`/lists/${list._id}`}>{list.name}</Link>
                </h3>
                <span className="list-count">{list.codes.length} codes</span>
              </div>
              {list.filter && (
                <div className="list-filter">Filter: {list.filter}</div>
              )}
              <div className="list-card-footer">
                <Link 
                  to={`/lists/${list._id}/edit`} 
                  className="btn-edit"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(list._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lists;