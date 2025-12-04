export interface Project {
  project_title: string
  project_desc: string
}

export interface Experience {
  company: string
  role: string
  job_desc: string
}

export interface UserData {
  name: string
  headline: string
  degree: string
  college: string
  email: string
  tech: string
  skills: string
  fileUrl: string | null
  filename: string
  about: string
  inputList: Project[]
  experience: Experience[]
  github: string
  linkedin: string
}

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

