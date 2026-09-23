// components/AxiosComponent.tsx
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const AxiosComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  // GET request
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<User[]> = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      setUsers(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // POST request
  const createPost = async () => {
    if (!newPost.title || !newPost.body) return;

    setLoading(true);
    try {
      const response: AxiosResponse<Post> = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: newPost.title,
          body: newPost.body,
          userId: 1,
        }
      );
      setPosts(prev => [response.data, ...prev]);
      setNewPost({ title: '', body: '' });
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE request
  const deletePost = async (postId: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Axios Data Fetching</h2>
      
      {/* GET Example */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Users (GET)</h3>
        <button
          onClick={fetchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>
        
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map(user => (
            <div key={user.id} className="p-4 border rounded">
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* POST Example */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Create Post (POST)</h3>
        <div className="space-y-2 mb-4">
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Body"
            value={newPost.body}
            onChange={(e) => setNewPost(prev => ({ ...prev, body: e.target.value }))}
            className="w-full p-2 border rounded"
            rows={3}
          />
          <button
            onClick={createPost}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Create Post
          </button>
        </div>

        <div className="space-y-2">
          {posts.map(post => (
            <div key={post.id} className="p-4 border rounded flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{post.title}</h4>
                <p className="text-sm text-gray-600">{post.body}</p>
              </div>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AxiosComponent;