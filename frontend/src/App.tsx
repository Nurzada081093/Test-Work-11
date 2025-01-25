import './App.css';
import RegisterContainer from './features/users/containers/RegisterContainer.tsx';
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import LoginContainer from './features/users/containers/LoginContainer.tsx';
import ProductsContainer from './features/products/containers/ProductsContainer.tsx';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductsContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
      </Routes>
    </Layout>
  )
};

export default App;
