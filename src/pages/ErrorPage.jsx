import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ErrorPage.css'

const redirectDelay = 120000

function ErrorPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      navigate('/', { replace: true })
    }, redirectDelay)

    return () => {
      window.clearTimeout(redirectTimer)
    }
  }, [navigate])

  return (
    <main className="error-page">
      <section className="error-panel" aria-labelledby="error-page-title">
        <p className="eyebrow">Unexpected Error</p>
        <h1 id="error-page-title">Something unexpected happened.</h1>
        <p>
          We are sorry for the interruption. Please return to the home page and
          continue browsing from there.
        </p>
        <p className="error-redirect-note">
          If no action is taken, you will be redirected home in 2 minutes.
        </p>
        <Link to="/" className="error-home-button">
          Home
        </Link>
      </section>
    </main>
  )
}

export default ErrorPage
