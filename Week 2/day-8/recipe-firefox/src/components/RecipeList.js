import React from 'react';

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  return (
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
                onClick={() => onEdit(recipe.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(recipe.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecipeList;
