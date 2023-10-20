import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import ProductCreation from './Components/ProductCreation/ProductCreation';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check for a logged-in user in local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedIn(true);
      setUsername(storedUser);
    }
  }, []);


  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn ? <Navigate to="/product-creation" /> : <Navigate to="/" />} />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product-creation" element={<ProductCreation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;