import './App.css';
import RegisterContainer from './features/users/containers/RegisterContainer.tsx';
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import LoginContainer from './features/users/containers/LoginContainer.tsx';
import ProductsContainer from './features/products/containers/ProductsContainer.tsx';
import AddNewProductContainer from './features/products/containers/AddNewProductContainer.tsx';
import Typography from '@mui/material/Typography';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ProductsContainer />} />
        <Route path="/products" element={<ProductsContainer />} />
        <Route path="/products/addNewProduct" element={<AddNewProductContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="*" element={<Typography variant="body1" sx={{width: '100%', fontSize: '80px', color: 'white', marginTop: '15%', textAlign: 'center'}}>Page is not found!</Typography>}/>
      </Routes>
    </Layout>
  )
};

export default App;
