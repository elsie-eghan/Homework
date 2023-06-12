import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import LoginPage from './components/Authentication/LoginPage';
import RegisterPage from './components/Authentication/RegisterPage';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <Router>
      <div className="container my-5">
        <div className="card p-4">
          <h1 className="mb-4">Recipe Book</h1>
          <Navbar user={user} />
          <Routes>
            <Route
              path="/"
              element={<RecipeList user={user} recipes={recipes} onSubmit={handleAddRecipe} />}
            />
            <Route
              path="/add-recipe"
              element={<RecipeForm onSubmit={handleAddRecipe} />}
            />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
