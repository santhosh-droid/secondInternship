import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import PostForm from './components/PostForm';
import NotFound from './components/NotFound'; // Import NotFound component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/create-post" element={<PostForm />} />
          <Route path="/edit-post/:id" element={<PostForm />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all for invalid routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
