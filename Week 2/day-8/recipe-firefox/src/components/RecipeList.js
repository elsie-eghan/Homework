import React, { useState } from 'react';

const RecipeList = ({ recipes, onEdit, onDelete, onSubmit }) => {
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    ingredients: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleAddRecipe = () => {
    onSubmit(newRecipe);
    setNewRecipe({
      title: '',
      description: '',
      ingredients: ''
    });
  };

  return (
    <div>
      <form className="mb-4">
        <h4>Add Recipe</h4>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={newRecipe.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={newRecipe.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients</label>
          <textarea
            className="form-control"
            id="ingredients"
            name="ingredients"
            value={newRecipe.ingredients}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddRecipe}>
          Add Recipe
        </button>
      </form>

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
    </div>
  );
};

export default RecipeList;
