import { useState, useEffect } from 'react';
import axiosMethods from './services/httpService';
import config from './config.json';
import './App.css';

function App() {
  const [posts, setPosts] = useState([])

  async function getResults() {
    const results = await axiosMethods.get(config.apiEndoint);
    setPosts(results.data)
  }

  useEffect(() => {
    getResults()
  }, [])


  const handleAdd = async () => {
    const obj = { title: "a title", body: "a body" }
    const results = await axiosMethods.post(config.apiEndoint, obj);
    setPosts([results.data, ...posts])
  };

  const handleUpdate = async (post) => {
    post.title = "UPDATED A Title"
    await axiosMethods.put(config.apiEndoint + "/" + post.id, post);

    const index = posts.indexOf(post)
    posts[index].title = post.title

    setPosts(posts.map(p => {
      return p
    }))
  };

  const handleDelete = async (post) => {
    const originalPosts = posts

    setPosts(posts.filter((p) => p.id !== post.id));

    try {
      await axiosMethods.put(config.apiEndoint + "/" + post.id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        alert("This post has already been deleted.");
      setPosts(originalPosts)
    };
  }

  return (
    <div className="App">
      <button className="btn btn-primary mt-2" onClick={handleAdd}>
        Add
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleUpdate(post)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(post)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
