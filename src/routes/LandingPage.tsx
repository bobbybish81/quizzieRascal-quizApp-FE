import { Link } from "react-router-dom";
import '.././styles/Landing.css';

const LandingPage = () => {

  return (
    <section className='landing-page'>
      <nav className='navbar'>
        <p className='desktop-portfolio-link'>Website developed by <Link
              to='https://robertbishwebdeveloper.com'
                target="_blank"
                rel="noreferrer">
                Robert Bish
              </Link>
        </p>
        <div className='navlinks'>
          <Link to={'/login'}>
            LOGIN
          </Link>
          <Link to={'/register'}>
            REGISTER
          </Link>
        </div>
      </nav>
      <article className='landing-page-title'>
        <h1>QUIZZIE RASCAL</h1>
        <h4>THE ULTIMATE QUIZ GAME</h4>
      </article>
      <p className='mobile-portfolio-link'>Website developed by <Link
            to='https://robertbishwebdeveloper.com'
              target="_blank"
              rel="noreferrer">
              Robert Bish
            </Link>
      </p>
    </section>
  )
}

export default LandingPage