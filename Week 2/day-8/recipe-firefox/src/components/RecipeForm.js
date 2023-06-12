import React, { useState } from 'react';

const RecipeForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation or any additional logic here
    const newRecipe = {
      id: Date.now(),
      title,
      description,
      ingredients,
    };
    onSubmit(newRecipe); // Call the onSubmit function passed as prop
    setTitle('');
    setDescription('');
    setIngredients('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="ingredients" className="form-label">
          Ingredients
        </label>
        <textarea
          id="ingredients"
          className="form-control"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
