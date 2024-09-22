import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './Components/TodoList';
import Login from './Components/Login';
import Signup from './Components/Signup';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <TodoList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={<Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/signup" 
            element={<Signup setIsAuthenticated={setIsAuthenticated} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
