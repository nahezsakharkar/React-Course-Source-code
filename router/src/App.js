import './App.css';
import { Routes, Route } from "react-router-dom"

import Navbar from './components/navbar';
import Dashboard from './components/admin/dashboard'
import Home from './components/home';
import Products from './components/products'
import ProductDetails from './components/productDetails';
import Posts from './components/posts'
import NotFound from './components/notFound';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="/posts">
            <Route index element={<Posts />} />
            <Route path=":year" element={<Posts />} />
            <Route path=":year/:month" element={<Posts />} />
          </Route>
          <Route path="admin" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
