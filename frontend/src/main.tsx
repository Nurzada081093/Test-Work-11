import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/joy';
import { persistor, store } from './app/store.ts';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <CssBaseline />
        <ToastContainer />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
