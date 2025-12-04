import { Card, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { FaGithub, FaGraduationCap } from 'react-icons/fa'
import { AiFillLinkedin, AiFillProject } from 'react-icons/ai'
import { MdWork } from 'react-icons/md'
import { SiGmail } from 'react-icons/si'
import { FormState } from '../../hooks/use-portfolio-form'

interface PortfolioPreviewProps {
  formState: FormState
}

const PortfolioPreview = ({ formState }: PortfolioPreviewProps) => {
  const skilllist = formState.skills ? formState.skills.split(',').map((s) => s.trim()).filter(Boolean) : []
  const techlist = formState.tech ? formState.tech.split(',').map((t) => t.trim()).filter(Boolean) : []

  return (
    <div className="portfolio-preview" style={{ 
      backgroundColor: '#0a192f', 
      minHeight: '100vh', 
      padding: '40px 20px',
      color: '#ccd6f6',
      fontFamily: '"Calibre", "Inter", "San Francisco", "SF Pro Text", "-apple-system", system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px', paddingTop: '80px' }}>
          <div style={{ 
            fontSize: 'clamp(40px, 8vw, 60px)', 
            fontWeight: 700, 
            color: '#ccd6f6',
            marginBottom: '20px'
          }}>
            Hi, I am <span style={{ color: 'rgb(144, 160, 217)' }}>{formState.name || 'Your Name'}</span>.
          </div>
          <div style={{ 
            fontSize: 'clamp(20px, 4vw, 30px)', 
            fontWeight: 700, 
            color: '#ccd6f6',
            marginBottom: '30px'
          }}>
            A {formState.headline || 'Your Headline'}.
          </div>
          
          {formState.previewUrl && (
            <div style={{ marginBottom: '30px' }}>
              <Image 
                src={formState.previewUrl} 
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '3px solid #64ffda'
                }}
                roundedCircle
              />
            </div>
          )}

          {formState.degree && (
            <div style={{ color: '#ccd6f6', fontSize: '18px', marginBottom: '20px' }}>
              <FaGraduationCap color="#64ffda" size={20} style={{ marginRight: '8px' }} />
              {formState.degree}, <span style={{ fontWeight: 700, color: 'rgb(144, 160, 217)' }}>{formState.college}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            {formState.github && (
              <a href={formState.github} target="_blank" rel="noopener noreferrer" style={{ color: '#64ffda' }}>
                <FaGithub size={25} />
              </a>
            )}
            {formState.linkedin && (
              <a href={formState.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#64ffda' }}>
                <AiFillLinkedin size={25} />
              </a>
            )}
            {formState.email && (
              <a href={`mailto:${formState.email}`} style={{ color: '#64ffda' }}>
                <SiGmail size={25} />
              </a>
            )}
          </div>
        </div>

        {/* About */}
        {formState.about && (
          <div style={{ marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px' }}>
            <p style={{ color: '#8890b2', fontSize: '18px', lineHeight: '1.6' }}>{formState.about}</p>
          </div>
        )}

        {/* Skills */}
        {(skilllist.length > 0 || techlist.length > 0) && (
          <Row style={{ marginBottom: '60px', justifyContent: 'center' }}>
            {skilllist.length > 0 && (
              <Col md={5} style={{ marginBottom: '30px' }}>
                <Card style={{ backgroundColor: 'transparent', border: 'none', color: '#ccd6f6' }}>
                  <Card.Body>
                    <Card.Title style={{ color: '#ccd6f6', fontSize: '24px', marginBottom: '15px' }}>Skills</Card.Title>
                    <Card.Subtitle style={{ color: '#64ffda', marginBottom: '15px' }}>Languages</Card.Subtitle>
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0, 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(2, minmax(140px, 200px))',
                      gap: '10px'
                    }}>
                      {skilllist.map((skill, index) => (
                        <li key={index} style={{ position: 'relative', paddingLeft: '20px', fontSize: '14px', color: '#8890b2' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#64ffda' }}>▹</span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            )}
            {techlist.length > 0 && (
              <Col md={5} style={{ marginBottom: '30px' }}>
                <Card style={{ backgroundColor: 'transparent', border: 'none', color: '#ccd6f6' }}>
                  <Card.Body>
                    <Card.Title style={{ color: '#ccd6f6', fontSize: '24px', marginBottom: '15px' }}>Technologies</Card.Title>
                    <Card.Subtitle style={{ color: '#64ffda', marginBottom: '15px' }}>Frameworks</Card.Subtitle>
                    <ul style={{ 
                      listStyle: 'none', 
                      padding: 0, 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(2, minmax(140px, 200px))',
                      gap: '10px'
                    }}>
                      {techlist.map((tech, index) => (
                        <li key={index} style={{ position: 'relative', paddingLeft: '20px', fontSize: '14px', color: '#8890b2' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#64ffda' }}>▹</span>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        )}

        {/* Projects */}
        {formState.inputList && formState.inputList.length > 0 && formState.inputList[0].project_title && (
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 700, 
              color: '#ccd6f6', 
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              Projects
            </h2>
            <Row className="exp" style={{ justifyContent: 'center' }}>
              {formState.inputList.map((project, index) => {
                if (!project.project_title) return null
                return (
                  <Col key={index} md={6} style={{ marginBottom: '20px' }}>
                    <Card style={{ 
                      backgroundColor: '#112240', 
                      border: 'none',
                      padding: '1.5rem',
                      transition: 'transform 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                    >
                      <Card.Body>
                        <Card.Title style={{ color: '#ccd6f6', marginBottom: '15px' }}>
                          <AiFillProject color="#64ffda" size={20} style={{ marginRight: '8px' }} />
                          {project.project_title}
                        </Card.Title>
                        <Card.Text style={{ color: '#8890b2', fontSize: '14px', lineHeight: '1.6' }}>
                          {project.project_desc}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>
        )}

        {/* Experience */}
        {formState.experience && formState.experience.length > 0 && formState.experience[0].company && (
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 700, 
              color: '#ccd6f6', 
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              Experience
            </h2>
            <Row className="exp" style={{ justifyContent: 'center' }}>
              {formState.experience.map((exp, index) => {
                if (!exp.company) return null
                return (
                  <Col key={index} md={6} style={{ marginBottom: '20px' }}>
                    <Card style={{ 
                      backgroundColor: '#112240', 
                      border: 'none',
                      padding: '1.5rem',
                      transition: 'transform 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                    >
                      <Card.Body>
                        <Card.Title style={{ color: '#ccd6f6', marginBottom: '10px' }}>
                          <MdWork color="#64ffda" size={20} style={{ marginRight: '8px' }} />
                          {exp.role}
                        </Card.Title>
                        <Card.Subtitle style={{ color: '#64ffda', marginBottom: '15px' }}>
                          {exp.company}
                        </Card.Subtitle>
                        <Card.Text style={{ color: '#8890b2', fontSize: '14px', lineHeight: '1.6' }}>
                          {exp.job_desc}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioPreview

