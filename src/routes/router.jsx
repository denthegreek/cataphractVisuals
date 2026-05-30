import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import About from '../pages/About.jsx'
import Collections from '../pages/Collections.jsx'
import Equipment from '../pages/Equipment.jsx'
import ErrorPage from '../pages/ErrorPage.jsx'
import Gallery from '../pages/Gallery.jsx'
import Home from '../pages/Home.jsx'
import PhoneShots from '../pages/PhoneShots.jsx'
import Poetry from '../pages/Poetry.jsx'
import Rights from '../pages/Rights.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'collections',
        element: <Collections />,
      },
      {
        path: 'poetry',
        element: <Poetry />,
      },
      {
        path: 'equipment',
        element: <Equipment />,
      },
      {
        path: 'phone-shots',
        element: <PhoneShots />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'rights',
        element: <Rights />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

export default router
