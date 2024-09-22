import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // useNavigate instead of useHistory
import '../styles/PostForm.css';

function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/posts/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:5000/api/posts/${id}` : 'http://localhost:5000/api/posts';
    axios({
      method,
      url,
      data: { title, content },
    })
      .then(() => {
        navigate('/'); // use navigate instead of history.push
      })
      .catch((error) => {
        console.error('Error saving post:', error);
      });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">{id ? 'Edit Post' : 'Create Post'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="form-textarea"
          />
        </div>
        <button type="submit" className="form-submit-btn">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
