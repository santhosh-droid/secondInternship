import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Back to Homepage</Link>
    </div>
  );
}

export default NotFound;
