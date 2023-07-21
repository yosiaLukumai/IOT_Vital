import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from './App'
import NotFound from './notFound'
import Dash from './pages/dash/Dash'
import { DashBoard } from './layout/Dashboard'
import './index.scss'
import { Graph } from './pages/dash/Graph'
import Protected from './Hooks/Protect'
import { retriveData } from './utils/localStorage'
const user = retriveData("userPm")
const router  = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<NotFound />,
    
  }, {
    path: "/auth/:id",
    element:<Protected isSignedIn={user}><DashBoard/></Protected>,
    errorElement: <NotFound/>,
    children:[
      {
        index:true,
        element: <Dash/>,
        
      },
      {
        path:"temp/:id",
        element: <Graph/>
      },
      {
        path:"spo/:id",
        element: <Graph/>
      },
      {
        path:"bpmss/:id",
        element: <Graph/>
      }
    ]
    
  }
], {basename:"/P-monitor"})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
