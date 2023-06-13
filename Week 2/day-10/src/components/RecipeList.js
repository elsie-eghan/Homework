import React, { useState } from 'react';
import Navbar from './Navbar';

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  const [loading, setLoading] = useState(false); // State to track loading state of actions

  const handleEdit = (id) => {
    // Handle edit action
    onEdit(id);
  };

  const handleDelete = async (id) => {
    setLoading(true); // Set loading state to true

    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <div>
      <Navbar user={true} />
      {recipes ? (
        <table className="table mt-5">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Ingredients</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.title}</td>
                <td>{recipe.description}</td>
                <td>{recipe.ingredients}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(recipe.id)}
                    disabled={loading} // Disable the button when action is being processed
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      'Edit'
                    )}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(recipe.id)}
                    disabled={loading} // Disable the button when action is being processed
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
