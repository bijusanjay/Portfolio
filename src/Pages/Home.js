import { Container, Row, Col, Button,ToastContainer} from "react-bootstrap"
import Toast from 'react-bootstrap/Toast'
import { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Link, Redirect, Switch} from "react-router-dom"
import { getAuth, onAuthStateChanged} from "firebase/auth"
import {useHistory} from "react-router-dom"
import icon  from '../assets/img2.jpg'
import Create from './Create'

const Home = () => {
    const [show, setShow] = useState(false);
    const auth = getAuth();
    const [user, setuser] = useState(null)

    onAuthStateChanged(auth, (currentUser) => {
        setuser(currentUser);
    });

    let history = useHistory();
    const createForm = () => {
        if(user) {
            history.push("/create");
        } else {
            setShow(!show);
        }
    }

    return ( 
        <div className="content">
            <Container>
                <Row className="row">
                    <Col className="column c1">
                        <h4>Create a portfolio</h4>
                        <br/>
                        <h5>You can make a simple <strong>portfolio</strong> here and share anywhere!</h5>
                        <br/>

                        <Button variant="outline-dark" onClick={createForm}> Create a portfolio </Button>
                        <ToastContainer className="p-3" position= "top-end">
                            <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
                                <Toast.Header>
                                    <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                    />
                                    <strong className="me-auto">Warning!</strong>
                                    <small></small>
                                </Toast.Header>
                                <Toast.Body>Please signup</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </Col>

                    <Col className="column c2">
                        <div className="image">
                            <img 
                            src={icon}
                            alt="image" 
                            width="500"
                            height="400"
                            className = "responsive-img"
                            />
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>
     );
}
 
export default Home;