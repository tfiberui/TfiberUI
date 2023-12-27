import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Government from './pages/Government'
import './scss/main.scss'
import Landing from './pages/Landing'
import Home from './pages/Home'
import About from './pages/AboutUs'
import Contact from './pages/Contact'
import Excel from './components/Excel/Excel';
import Cell from './pages/CellTower'
import Residential from './pages/Residential'
import Enterprise from './pages/Enterprise'
import Terms from './pages/Terms';
import Documents from './pages/Documents';
import Gallery from './pages/Gallery';
import Circulars from './pages/Circulars';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import Press from './pages/Press';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';

if(!window.language) {
  window.language = 'english';
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/government",
    element: <Government language={window.language} />,
  },
  {
    path: "/about-us",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/cell",
    element: <Cell language={window.language}/>,
  },
 {
    path: "/Enterprise",
    element: <Enterprise language={window.language} />,
  },
  {
    path: "/Residential",
    element: <Residential language={window.language}/>,
  },
  {
    path: "/terms",
    element: <Terms language={window.language}/>,
  },
  {
    path: "/documents",
    element: <Documents language={window.language}/>,
  },
  {
    path: "/gallery",
    element: <Gallery language={window.language}/>,
  },
  {
    path: "/circulars",
    element: <Circulars language={window.language}/>,
  },
  {
    path: "/faq",
    element: <FAQ language={window.language}/>,
  },
   {
    path: "/feedback",
    element: <Feedback language={window.language}/>,
  },
  {
    path: "/press",
    element: <Press language={window.language}/>,
  },
  {
    path: "/comingSoon",
    element: <ComingSoon language={window.language} />
  },
  {
    path: "*",
    element: <NotFound language={window.language} />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)