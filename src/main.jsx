import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from "./router/index";  // ✅ Ensure correct import path
import { LanguageContextProvider } from './contexts/LanguageContext';

createRoot(document.getElementById('root')).render(
  <LanguageContextProvider>
    <RouterProvider router={router} />
  </LanguageContextProvider>
);
