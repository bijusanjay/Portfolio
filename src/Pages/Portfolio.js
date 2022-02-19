import { Container, Row, Col, Card, Navbar, Button} from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { useEffect, useState } from "react";
import { FaGithub, FaGraduationCap, FaRegUser} from "react-icons/fa";
import { AiFillLinkedin, AiFillProject, AiOutlineCopyrightCircle } from "react-icons/ai";
import {MdWork} from "react-icons/md"
import { SiGmail } from "react-icons/si";
import { useParams, useLocation} from "react-router-dom";

const Portfolio = () => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [skilllist, setSkilllist] = useState([]);
    const [techlist, setTechlist] = useState([]);
    const { id } = useParams();
    let year = new Date().getFullYear();


    const search = useLocation().search;
    const user_id = new URLSearchParams(search).get('id');

    useEffect(() => {
        onSnapshot(doc(db, "users", user_id), (doc) => {
            setData(doc.data());
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (data && data.length !== 0) {
            const lan = data.skills.split(',');
            const tech = data.tech.split(',');
            setSkilllist(lan);
            setTechlist(tech);
        }

    }, [data])


    return (
        loaded && (
            <div className="portfolio">
                <Navbar>
                    <Container>
                        <Navbar.Brand href="#">
                            <FaRegUser size={40} color="#64ffda"/>
                        </Navbar.Brand>
                    </Container>
                </Navbar>

                <Container className="bx">
                    <Row className="row rp">
                        <Col className="column">
                            <Row className="name">
                                <Col>
                                    <div className="user">
                                        Hi, I am
                                        <span className="user_name"> {data.name}.</span>
                                    </div>
                                    <div className="headline">
                                        A {data.headline}.
                                    </div>
                                </Col>
                            </Row>
                            <br />

                            <Row>
                                <Col>
                                    <div className='abt'>
                                        <p>{data.about}</p>
                                    </div>
                                </Col>
                            </Row>
                            <br/>

                            <Row>
                                <Col>
                                    <Image src={data.fileUrl} height={100} width={100} roundedCircle/>
                                    <br/>
                                    <div className="degree">
                                        <FaGraduationCap color="#64ffda" size={23}/> {data.degree},
                                        <span className="college"> {data.college} </span>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className='center'>
                                        <a href={data.github} target="_blank"><FaGithub size={25} color="#64ffda" /></a>
                                        <a href={data.linkedin} target="_blank"><AiFillLinkedin size={25} color="#64ffda" /></a>
                                        <a ><SiGmail size={25} color="#64ffda"/></a>
                                    </div>
                                </Col>
                            </Row>
                            <br/>
                            <br/>
                            <Row>
                                    <Col>
                                        <Card className="skill-box" style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title>Skills</Card.Title>
                                                <Card.Subtitle className="mb-2 language">Languages</Card.Subtitle>
                                                <Card.Text>
                                                    <ul className="skills-list">
                                                        {skilllist.map((skilllist, index) => {
                                                            return (
                                                                <div className="lan" key={index}>
                                                                    <li>{skilllist}</li>
                                                                </div>
                                                            )
                                                        })}
                                                    </ul>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col>
                                        <Card className="skill-box" style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    <Card.Title>Technologies</Card.Title>
                                                    <Card.Subtitle className="mb-2 language">Frameworks</Card.Subtitle>
                                                    <Card.Text>
                                                        <ul className="skills-list">
                                                            {techlist.map((techlist, index) => {
                                                                return (
                                                                    <div className="lan" key={index}>
                                                                        <li>{techlist}</li>
                                                                    </div>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Card.Text>
                                                </Card.Body>
                                        </Card>                   
                                    </Col>
                            </Row>

                            <br />
                            <div className="work">
                                        Projects
                            </div>
                            <br/>
                            <Row className="exp">
                                
                                    {data.inputList.map((obj, index) => {
                                            return (
                                                <Col>
                                                    <Card className="skill-box borders" style={{ width: '18rem' }}>
                                                        <Card.Body>
                                                            <Card.Title className="proj-title"><AiFillProject color="#64ffda"/> {obj.project_title}</Card.Title>
                                                            {/* <Card.Subtitle className="mb-2 language">{obj.company}</Card.Subtitle> */}
                                                            <Card.Text>
                                                                <div className="proj-desc">
                                                                    <p>{obj.project_desc}</p>
                                                                </div>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                
                            </Row>
                            <br/>
                            <br/>
                            <div className="work">
                                        Experience
                            </div>
                            <br/>
                            <Row className="exp">
                                
                                    {data.experience.map((obj, index) => {
                                            return (
                                                <Col>
                                                    <Card className="skill-box borders" style={{ width: '18rem' }}>
                                                        <Card.Body>
                                                            <Card.Title className="proj-title"><MdWork color="#64ffda"/> {obj.role}</Card.Title>
                                                            <Card.Subtitle className="mb-2 language">{obj.company}</Card.Subtitle>
                                                            <Card.Text>
                                                                <div className="proj-desc">
                                                                    <p>{obj.job_desc}</p>
                                                                </div>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                
                            </Row>
                            <br/>
                            <br/>
                            <div className="work">
                                        Get In Touch
                            </div>
                            <br/>
                            <Row className="touch">
                                <Col>
                                    <div className="abt">
                                        <p>Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!</p>
                                    </div>
                                    <br/>
                                    <Button href={data.email} className="hello-btn">Say Hello</Button>
                                </Col>
                            </Row>
                            <br/>
                            <Row className="footer">
                                <Col>
                                    <div className="footer-text">
                                        <AiOutlineCopyrightCircle color="#64ffda"/>
                                        <span className="abt"> {year} Portfolio, Inc.</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    );
}

export default Portfolio;