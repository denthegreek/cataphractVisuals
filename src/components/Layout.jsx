import { Outlet } from 'react-router-dom'
import BackToTop from './BackToTop.jsx'
import ImageProtection from './ImageProtection.jsx'
import Navbar from './Navbar.jsx'
import RightsFooter from './RightsFooter.jsx'
import ScrollToTop from './ScrollToTop.jsx'

function Layout() {
  return (
    <>
      <ScrollToTop />
      <ImageProtection />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <RightsFooter />
      <BackToTop />
    </>
  )
}

export default Layout
