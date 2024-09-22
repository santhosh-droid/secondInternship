import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../styles/PostPage.css';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  // Function to format date or return 'Date not available' if date is invalid
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Date not available' : date.toLocaleDateString();
  };

  return post ? (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-content">{post.content}</p>
      <p className="post-date">
        Published on: {post.createdAt ? formatDate(post.createdAt) : 'Date not available'}
      </p>
      <Link className="back-link" to="/">Back to Homepage</Link>
    </div>
  ) : (
    <p>Loading post...</p>
  );
}

export default PostPage;
