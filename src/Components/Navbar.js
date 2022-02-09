import {Navbar, Container, Nav} from 'react-bootstrap'
import logo from '../assets/logo-fav.png'
import icon from '../assets/google-icon.png'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged} from "firebase/auth"
import { useState } from 'react';
import firebase from '../Firebase'
import { NavLink, useHistory} from 'react-router-dom'
import Home from './Home';

const NavbarContainer = () => {
    let history = useHistory();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const [user, setuser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setuser(currentUser);
    });

    const signUp = () => {
            
            signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            
            console.log(auth.currentUser.email);

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
        
    }

    const logOut = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful');
            history.push("/");
          }).catch((error) => {
            // An error happened.
          });
    }

    return (
        <div className="header">
            <Navbar sticky="top">
                <Container>
                    <Navbar bg="light" variant="light" className='navBackground'>

                            <Navbar.Brand href="/">
                                <img
                                alt="logo"
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                />
                            Portfolio
                            </Navbar.Brand>
                            <Nav.Item>
                                <NavLink className="navbar" to="/">Home</NavLink>
                            </Nav.Item>

                    </Navbar>

                    <Navbar.Toggle />
                    <Navbar className="me-auto-end">
                        <Navbar.Brand className='googleIcon' onClick= {signUp}>
                                <img
                                alt="icon"
                                src={icon}
                                width="23"
                                height="23"
                                className="d-inline-block align-top"
                                />
                                {user?.displayName}
                        </Navbar.Brand>
                        {user?
                        <Nav.Item>
                        <NavLink className="navbar n1" to="/" onClick = {logOut}>Sign-out</NavLink>
                        </Nav.Item>
                        :<></>}
                    </Navbar>
                </Container>
            </Navbar>
        </div>
        
     );
}
 
export default NavbarContainer;