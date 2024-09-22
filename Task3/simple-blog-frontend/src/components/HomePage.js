import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className='post-card'key={post._id}>
            <h2 className='post-title'>{post.title}</h2>
            <p className='post-content'>{post.content.substring(0, 100)}...</p>
            <p className='post-date'>{new Date(post.createdAt).toLocaleDateString()}</p>
            <Link to={`/posts/${post._id}`} className='read-more'>Read More</Link>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
      <div className='footer'>&copy; 2024 Blogs Website</div>
    </div>
  );
}

export default HomePage;
