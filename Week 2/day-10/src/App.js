import './App.css';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import { db } from './firebase';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Authentication/LoginPage';
import RegisterPage from './components/Authentication/RegisterPage';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'recipes'), (snapshot) => {
      const recipesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    });

    return () => unsubscribe();
  }, []);

  const addRecipe = async (recipe) => {
    try {
      const docRef = await addDoc(collection(db, 'recipes'), recipe);
      recipe.id = docRef.id;
      setRecipes([...recipes, recipe]);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      await deleteDoc(doc(db, 'recipes', recipeId));
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const updateRecipe = async (recipe) => {
    try {
      await updateDoc(doc(db, 'recipes', recipe.id), recipe);
      setRecipes(
        recipes.map((r) => (r.id === recipe.id ? { ...r, ...recipe } : r))
      );
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <Router>
      <div className="container my-5">
        <div className="card p-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/recipes" element={<div>
              <h1>Recipe Book</h1>
              <RecipeForm onSubmit={addRecipe} />
              <RecipeList
                recipes={recipes}
                onDelete={deleteRecipe}
                onEdit={updateRecipe}
              />
            </div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
