import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolioForm } from '../../hooks/use-portfolio-form'
import { FaEye, FaSave, FaTrash, FaCamera } from 'react-icons/fa'
import './create-form.css'

const CreateForm = () => {
  const { state, dispatch, user, handleFileUpload, handleSubmit, handleRemove } = usePortfolioForm()
  const [urlErrors, setUrlErrors] = useState({ github: '', linkedin: '' })

  const portfolioUrl = user?.email ? `/portfolio/${user.email}` : '#'

  const validateUrl = (url: string, field: 'github' | 'linkedin') => {
    if (!url) {
      setUrlErrors(prev => ({ ...prev, [field]: '' }))
      return true
    }

    try {
      const urlObj = new URL(url)
      const isValid = urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
      
      if (field === 'github' && !url.includes('github.com')) {
        setUrlErrors(prev => ({ ...prev, [field]: 'Must be a valid GitHub URL' }))
        return false
      }
      
      if (field === 'linkedin' && !url.includes('linkedin.com')) {
        setUrlErrors(prev => ({ ...prev, [field]: 'Must be a valid LinkedIn URL' }))
        return false
      }

      if (isValid) {
        setUrlErrors(prev => ({ ...prev, [field]: '' }))
        return true
      }
    } catch {
      setUrlErrors(prev => ({ ...prev, [field]: 'Invalid URL format' }))
      return false
    }
    return false
  }

  const addSkillTag = (tag: string) => {
    const currentSkills = state.skills ? state.skills.split(',').map(s => s.trim()).filter(Boolean) : []
    if (tag && !currentSkills.includes(tag)) {
      const newSkills = [...currentSkills, tag].join(', ')
      dispatch({ type: 'SET_FIELD', field: 'skills', value: newSkills })
    }
  }

  const removeSkillTag = (tag: string) => {
    const currentSkills = state.skills ? state.skills.split(',').map(s => s.trim()).filter(Boolean) : []
    const newSkills = currentSkills.filter(s => s !== tag).join(', ')
    dispatch({ type: 'SET_FIELD', field: 'skills', value: newSkills })
  }

  const addTechTag = (tag: string) => {
    const currentTech = state.tech ? state.tech.split(',').map(s => s.trim()).filter(Boolean) : []
    if (tag && !currentTech.includes(tag)) {
      const newTech = [...currentTech, tag].join(', ')
      dispatch({ type: 'SET_FIELD', field: 'tech', value: newTech })
    }
  }

  const removeTechTag = (tag: string) => {
    const currentTech = state.tech ? state.tech.split(',').map(s => s.trim()).filter(Boolean) : []
    const newTech = currentTech.filter(s => s !== tag).join(', ')
    dispatch({ type: 'SET_FIELD', field: 'tech', value: newTech })
  }

  const skillTags = state.skills ? state.skills.split(',').map(s => s.trim()).filter(Boolean) : []
  const techTags = state.tech ? state.tech.split(',').map(s => s.trim()).filter(Boolean) : []

  const handleFileInputClick = () => {
    document.getElementById('profilePicInput')?.click()
  }

  return (
    <div className="create-page">
      <Container className="form-container">
        {/* Action Buttons */}
        <div className="action-bar">
          {state.portfolio && user?.email && (
            <Link to={portfolioUrl} target="_blank" className="icon-btn primary" title="View Portfolio">
              <FaEye />
            </Link>
          )}
          {state.update && (
            <button className="icon-btn success" onClick={handleSubmit} title="Update Portfolio">
              <FaSave />
            </button>
          )}
          {state.remove && (
            <button className="icon-btn danger" onClick={handleRemove} title="Remove Portfolio">
              <FaTrash />
            </button>
          )}
        </div>

        <Form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="portfolio-form">
          {/* Personal Information with Profile Picture */}
          <Card className="form-section">
            <Card.Body>
              <h6 className="section-header">Personal Information</h6>
              
              {/* Profile Picture */}
              <div className="profile-pic-section-inline">
                <div className="profile-pic-wrapper" onClick={handleFileInputClick}>
                  {state.previewUrl ? (
                    <img src={state.previewUrl} alt="Profile" className="profile-pic" />
                  ) : (
                    <div className="profile-pic-placeholder">
                      <FaCamera size={30} />
                      <span>Upload Photo</span>
                    </div>
                  )}
                  <div className="profile-pic-overlay">
                    <FaCamera size={20} />
                    <span>Change</span>
                  </div>
                </div>
                <input
                  id="profilePicInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                  style={{ display: 'none' }}
                />
              </div>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your full name"
                    value={state.name}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                    required
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Headline *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Software Engineer"
                    value={state.headline}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'headline', value: e.target.value })}
                    required
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="your.email@example.com"
                    value={state.email}
                    onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                    required
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* About and Experience in Grid */}
              <Card className="form-section">
                <Card.Body>
                  <h6 className="section-header">About</h6>
                  <Form.Group>
                    <Form.Label>About Yourself</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      placeholder="Tell us about yourself..."
                      value={state.about}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'about', value: e.target.value })}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
          <Row>
            {/* About */}
            <Col md={6}>
            </Col>

            {/* Experience */}
            <Col md={6}>
            </Col>
          </Row>
              <Card className="form-section">
                <Card.Body>
                  <h6 className="section-header">Experience</h6>
                  {state.experience.map((exp, i) => (
                    <div key={i} className="dynamic-item">
                      <Form.Group className="mb-3">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Company name"
                          value={exp.company}
                          onChange={(e) => dispatch({ type: 'SET_EXPERIENCE', index: i, field: 'company', value: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Job title"
                          value={exp.role}
                          onChange={(e) => dispatch({ type: 'SET_EXPERIENCE', index: i, field: 'role', value: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Describe your role..."
                          value={exp.job_desc}
                          onChange={(e) => dispatch({ type: 'SET_EXPERIENCE', index: i, field: 'job_desc', value: e.target.value })}
                        />
                      </Form.Group>
                      <div className="item-actions">
                        {state.experience.length > 1 && (
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', index: i })}
                          >
                            Remove
                          </Button>
                        )}
                        {i === state.experience.length - 1 && (
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => dispatch({ type: 'ADD_EXPERIENCE' })}
                          >
                            Add Experience
                          </Button>
                        )}
                      </div>
                      {i < state.experience.length - 1 && <hr className="item-divider" />}
                    </div>
                  ))}
                </Card.Body>
              </Card>

          {/* Education and Social Links in Grid */}
          <Row>
            {/* Education */}
            <Col md={6}>
              <Card className="form-section">
                <Card.Body>
                  <h6 className="section-header">Education</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>Degree</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., B.Tech, M.S."
                      value={state.degree}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'degree', value: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>College/University</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="College name"
                      value={state.college}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'college', value: e.target.value })}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            {/* Social Links */}
            <Col md={6}>
              <Card className="form-section">
                <Card.Body>
                  <h6 className="section-header">Social Links</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>GitHub</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="https://github.com/username"
                      value={state.github}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'github', value: e.target.value })}
                      onBlur={(e) => validateUrl(e.target.value, 'github')}
                      isInvalid={!!urlErrors.github}
                    />
                    <Form.Control.Feedback type="invalid">
                      {urlErrors.github}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>LinkedIn</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={state.linkedin}
                      onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'linkedin', value: e.target.value })}
                      onBlur={(e) => validateUrl(e.target.value, 'linkedin')}
                      isInvalid={!!urlErrors.linkedin}
                    />
                    <Form.Control.Feedback type="invalid">
                      {urlErrors.linkedin}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Skills & Technologies */}
          <Row>
            <Col md={6}>
              <Card className="form-section">
                <Card.Body>
                  <h6 className="section-header">Languages</h6>
                  <Form.Group className="mb-3">
                    <div className="tags-input-wrapper">
                      <div className="tags-container">
                        {skillTags.map((tag, index) => (
                          <span key={index} className="tag">
                            {tag}
                            <button
                              type="button"
                              className="tag-remove"
                              onClick={() => removeSkillTag(tag)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <Form.Control
                        type="text"
                        placeholder="Press Enter to add"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            const target = e.target as HTMLInputElement
                            addSkillTag(target.value.trim())
                            target.value = ''
                          }
                        }}
                        className="tag-input"
                      />
                    </div>
                    <Form.Text className="text-muted">e.g., Python, JavaScript</Form.Text>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="form-section">
                <Card.Body>
                  <h6 className="section-header">Tools & Technologies</h6>
                  <Form.Group className="mb-3">
                    <div className="tags-input-wrapper">
                      <div className="tags-container">
                        {techTags.map((tag, index) => (
                          <span key={index} className="tag">
                            {tag}
                            <button
                              type="button"
                              className="tag-remove"
                              onClick={() => removeTechTag(tag)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <Form.Control
                        type="text"
                        placeholder="Press Enter to add"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            const target = e.target as HTMLInputElement
                            addTechTag(target.value.trim())
                            target.value = ''
                          }
                        }}
                        className="tag-input"
                      />
                    </div>
                    <Form.Text className="text-muted">e.g., React, Docker</Form.Text>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Projects */}
          <Card className="form-section">
            <Card.Body>
              <h6 className="section-header">Projects</h6>
              {state.inputList.map((project, i) => (
                <div key={i} className="dynamic-item">
                  <Form.Group className="mb-3">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Project name"
                      value={project.project_title}
                      onChange={(e) => dispatch({ type: 'SET_PROJECT', index: i, field: 'project_title', value: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Describe your project..."
                      value={project.project_desc}
                      onChange={(e) => dispatch({ type: 'SET_PROJECT', index: i, field: 'project_desc', value: e.target.value })}
                    />
                  </Form.Group>
                  <div className="item-actions">
                    {state.inputList.length > 1 && (
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => dispatch({ type: 'REMOVE_PROJECT', index: i })}
                      >
                        Remove
                      </Button>
                    )}
                    {i === state.inputList.length - 1 && (
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => dispatch({ type: 'ADD_PROJECT' })}
                      >
                        Add Project
                      </Button>
                    )}
                  </div>
                  {i < state.inputList.length - 1 && <hr className="item-divider" />}
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Submit Button */}
          {state.submit && (
            <div className="submit-section">
              <Button variant="primary" type="submit" size="lg" className="submit-btn">
                Submit Portfolio
              </Button>
            </div>
          )}
        </Form>
      </Container>
    </div>
  )
}

export default CreateForm
