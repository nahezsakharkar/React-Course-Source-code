import { useState } from 'react';
import MoviePage from './context/MoviePage';
import Login from './context/Login';
import UserContext from './context/userContext';
import './App.css';
import CartContext from './context/cartContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLoggedIn = (username) => {
    console.log("Getting the user: ", username)
    const user = { name: "john" }
    setCurrentUser(user)
  }

  return (
    <CartContext.Provider value={{ cart: [] }}>
      <UserContext.Provider value={{ currentUser: currentUser, onLoggedIn: handleLoggedIn }}>
        <div className="App">
          <MoviePage />
          <Login />
        </div>
      </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
