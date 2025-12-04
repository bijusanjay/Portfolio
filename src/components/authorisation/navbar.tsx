import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth'
import { NavLink, useHistory } from 'react-router-dom'
import logo from '../../assets/logo-fav.png'
import icon from '../../assets/google-icon.png'

const Navbar = () => {
  const history = useHistory()
  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [auth])

  const signUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        console.log(auth.currentUser?.email)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.error('Sign in error:', errorCode, errorMessage, email, credential)
      })
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful')
        history.push('/')
      })
      .catch((error) => {
        console.error('Sign-out error:', error)
      })
  }

  return (
    <div className="header">
      <BootstrapNavbar sticky="top">
        <Container>
          <BootstrapNavbar bg="light" variant="light" className="navBackground">
            <BootstrapNavbar.Brand href="/">
              <img
                alt="logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              Portfolio
            </BootstrapNavbar.Brand>
            <Nav.Item>
              <NavLink className="navbar" to="/">
                Home
              </NavLink>
            </Nav.Item>
          </BootstrapNavbar>

          <BootstrapNavbar.Toggle />
          <BootstrapNavbar className="me-auto-end">
            <BootstrapNavbar.Brand className="googleIcon" onClick={signUp}>
              <img
                alt="icon"
                src={icon}
                width="23"
                height="23"
                className="d-inline-block align-top"
              />
              {user?.displayName}
            </BootstrapNavbar.Brand>
            {user ? (
              <Nav.Item>
                <NavLink className="navbar n1" to="/" onClick={logOut}>
                  Sign-out
                </NavLink>
              </Nav.Item>
            ) : null}
          </BootstrapNavbar>
        </Container>
      </BootstrapNavbar>
    </div>
  )
}

export default Navbar
