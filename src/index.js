import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Login from './routes/Login/Login';
import Cadastro from './routes/Cadastro/Cadastro';
import Home from './routes/Home/Home';

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'home',
    element: <Home />,
  },
  {
    path: 'cadastro',
    element: <Cadastro />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
