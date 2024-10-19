import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import Terms from './Components/Terms/Terms.jsx';
import Orders from './Components/Orders/Orders.jsx';
import PrivateRoute from './routs/PrivateRoute/PrivateRoute.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/terms",
        element: <Terms></Terms>
      },
      {
        path:"/orders",
        element: <PrivateRoute><Orders></Orders></PrivateRoute>
      },
      {
        path:"/profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path:"/dash",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>,
)
