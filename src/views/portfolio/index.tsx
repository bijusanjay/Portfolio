import { Container, Row, Col, Card, Navbar, Button } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../api/firebase'
import { useEffect, useState } from 'react'
import { FaGithub, FaGraduationCap, FaRegUser } from 'react-icons/fa'
import { AiFillLinkedin, AiFillProject, AiOutlineCopyrightCircle } from 'react-icons/ai'
import { MdWork } from 'react-icons/md'
import { SiGmail } from 'react-icons/si'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserData } from '../../types'
import './portfolio.css'

const Portfolio = () => {
  const [data, setData] = useState<UserData | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [skilllist, setSkilllist] = useState<string[]>([])
  const [techlist, setTechlist] = useState<string[]>([])
  const { id } = useParams<{ id: string }>()
  const year = new Date().getFullYear()

  useEffect(() => {
    if (!id) return

    const unsubscribe = onSnapshot(doc(db, 'users', id), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setData(docSnapshot.data() as UserData)
        setLoaded(true)
      }
    })

    return () => unsubscribe()
  }, [id])

  useEffect(() => {
    if (data) {
      const lan = data.skills ? data.skills.split(',').map((s) => s.trim()).filter(Boolean) : []
      const tech = data.tech ? data.tech.split(',').map((t) => t.trim()).filter(Boolean) : []
      setSkilllist(lan)
      setTechlist(tech)
    }
  }, [data])

  if (!loaded || !data) {
    return (
      <div className="portfolio">
        <Container>
          <Row>
            <Col>
              <div style={{ textAlign: 'center', color: '#ccd6f6', padding: '50px' }}>Loading...</div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="portfolio">
      <Navbar className="portfolio-navbar">
        <Container>
          <Navbar.Brand href="#">
            <FaRegUser size={40} color="#64ffda" />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="portfolio-container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="portfolio-content"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInUp} className="hero-section">
            <div className="hero-content">
              <div className="user-greeting">
                Hi, I am <span className="user-name">{data.name}</span>.
              </div>
              <div className="headline-text">A {data.headline}.</div>
              
              {data.fileUrl && (
                <motion.div
                  className="profile-image-wrapper"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                  <Image 
                    src={data.fileUrl} 
                    className="profile-image"
                    roundedCircle
                  />
                </motion.div>
              )}

              {data.degree && (
                <div className="degree-info">
                  <FaGraduationCap color="#64ffda" size={20} />
                  <span>{data.degree}, <span className="college-name">{data.college}</span></span>
                </div>
              )}

              <div className="social-links">
                {data.github && (
                  <motion.a
                    href={data.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub size={28} color="#64ffda" />
                  </motion.a>
                )}
                {data.linkedin && (
                  <motion.a
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AiFillLinkedin size={28} color="#64ffda" />
                  </motion.a>
                )}
                {data.email && (
                  <motion.a
                    href={`mailto:${data.email}`}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SiGmail size={28} color="#64ffda" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          {data.about && (
            <motion.section variants={fadeInUp} className="section">
              <div className="section-content">
                <p className="about-text">{data.about}</p>
              </div>
            </motion.section>
          )}

          {/* Skills Section */}
          {(skilllist.length > 0 || techlist.length > 0) && (
            <motion.section variants={fadeInUp} className="section">
              <h2 className="section-title">Skills & Technologies</h2>
              <Row className="skills-row">
                {skilllist.length > 0 && (
                  <Col md={6} className="mb-4">
                    <Card className="skill-card">
                      <Card.Body>
                        <Card.Title className="skill-card-title">Skills</Card.Title>
                        <Card.Subtitle className="skill-card-subtitle">Languages</Card.Subtitle>
                        <ul className="skills-list">
                          {skilllist.map((skill, index) => (
                            <motion.li
                              key={index}
                              className="skill-item"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {skill}
                            </motion.li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
                {techlist.length > 0 && (
                  <Col md={6} className="mb-4">
                    <Card className="skill-card">
                      <Card.Body>
                        <Card.Title className="skill-card-title">Technologies</Card.Title>
                        <Card.Subtitle className="skill-card-subtitle">Frameworks & Tools</Card.Subtitle>
                        <ul className="skills-list">
                          {techlist.map((tech, index) => (
                            <motion.li
                              key={index}
                              className="skill-item"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {tech}
                            </motion.li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
            </motion.section>
          )}

          {/* Projects Section */}
          {data.inputList && data.inputList.length > 0 && data.inputList[0].project_title && (
            <motion.section variants={fadeInUp} className="section">
              <h2 className="section-title">Projects</h2>
              <Row className="projects-row">
                {data.inputList.map((project, index) => (
                  <Col key={index} md={6} lg={4} className="mb-4">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      <Card className="project-card">
                        <Card.Body>
                          <Card.Title className="project-title">
                            <AiFillProject color="#64ffda" size={20} style={{ marginRight: '8px' }} />
                            {project.project_title}
                          </Card.Title>
                          <Card.Text className="project-description">
                            {project.project_desc}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.section>
          )}

          {/* Experience Section */}
          {data.experience && data.experience.length > 0 && data.experience[0].company && (
            <motion.section variants={fadeInUp} className="section">
              <h2 className="section-title">Experience</h2>
              <Row className="experience-row">
                {data.experience.map((exp, index) => (
                  <Col key={index} md={6} lg={4} className="mb-4">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      <Card className="experience-card">
                        <Card.Body>
                          <Card.Title className="experience-title">
                            <MdWork color="#64ffda" size={20} style={{ marginRight: '8px' }} />
                            {exp.role}
                          </Card.Title>
                          <Card.Subtitle className="experience-company">{exp.company}</Card.Subtitle>
                          <Card.Text className="experience-description">
                            {exp.job_desc}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.section>
          )}

          {/* Contact Section */}
          <motion.section variants={fadeInUp} className="section contact-section">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-content">
              <p className="contact-text">
                My inbox is always open. Whether you have a question or just want to say hi, I'll
                try my best to get back to you!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button href={`mailto:${data.email}`} className="hello-button">
                  Say Hello
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer variants={fadeInUp} className="footer">
            <div className="footer-content">
              <AiOutlineCopyrightCircle color="#64ffda" size={16} />
              <span className="footer-text">{year} Portfolio, Inc.</span>
            </div>
          </motion.footer>
        </motion.div>
      </Container>
    </div>
  )
}

export default Portfolio

