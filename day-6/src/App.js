import './App.css';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, ingredients });
    setTitle('');
    setDescription('');
    setIngredients('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Ingredients</label>
        <textarea
          className="form-control"
          rows="3"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-outline-primary">
        Add Recipe
      </button>
    </form>
  );
};

const RecipeItem = ({ recipe, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{recipe.title}</td>
      <td>{recipe.description}</td>
      <td>{recipe.ingredients}</td>
      <td>
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => onEdit(recipe)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(recipe)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

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
          <RecipeItem
            key={index}
            recipe={recipe}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes'));
    if (savedRecipes) {
      setRecipes(savedRecipes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const deleteRecipe = (recipe) => {
    setRecipes(recipes.filter((r) => r.title !== recipe.title));
  };

  const editRecipe = (recipe) => {
    deleteRecipe(recipe);
    setEditingRecipe(recipe);
  };

  const updateRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
    setEditingRecipe(null);
  };

  const [editingRecipe, setEditingRecipe] = useState(null);

  return (
    <div className="container my-5">
      <div className="card p-4">
        <h1>Recipe Book</h1>
        <RecipeForm onSubmit={addRecipe} />
        <RecipeList
          recipes={recipes}
          onEdit={editRecipe}
          onDelete={deleteRecipe}
        />
        {editingRecipe && (
          <div className="mt-4">
            <h2>Edit Recipe</h2>
            <RecipeForm onSubmit={updateRecipe} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
