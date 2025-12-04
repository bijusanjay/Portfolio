import { useReducer, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db } from '../api/firebase'
import { UserData, Project, Experience } from '../types'

export interface FormState {
  name: string
  headline: string
  degree: string
  college: string
  email: string
  tech: string
  fileUrl: string | null
  previewUrl: string | null
  skills: string
  about: string
  github: string
  linkedin: string
  filename: string
  inputList: Project[]
  experience: Experience[]
  update: boolean
  remove: boolean
  portfolio: boolean
  submit: boolean
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: any }
  | { type: 'SET_PROJECT'; index: number; field: keyof Project; value: string }
  | { type: 'ADD_PROJECT' }
  | { type: 'REMOVE_PROJECT'; index: number }
  | { type: 'SET_EXPERIENCE'; index: number; field: keyof Experience; value: string }
  | { type: 'ADD_EXPERIENCE' }
  | { type: 'REMOVE_EXPERIENCE'; index: number }
  | { type: 'LOAD_DATA'; data: UserData }
  | { type: 'RESET_FORM' }
  | { type: 'SET_PREVIEW_URL'; url: string | null }
  | { type: 'SET_FILE_URL'; url: string | null }

const initialState: FormState = {
  name: '',
  headline: '',
  degree: '',
  college: '',
  email: '',
  tech: '',
  fileUrl: null,
  previewUrl: null,
  skills: '',
  about: '',
  github: '',
  linkedin: '',
  filename: '',
  inputList: [{ project_title: '', project_desc: '' }],
  experience: [{ company: '', role: '', job_desc: '' }],
  update: false,
  remove: false,
  portfolio: false,
  submit: true,
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_PROJECT': {
      const newList = [...state.inputList]
      newList[action.index] = { ...newList[action.index], [action.field]: action.value }
      return { ...state, inputList: newList }
    }
    case 'ADD_PROJECT':
      return { ...state, inputList: [...state.inputList, { project_title: '', project_desc: '' }] }
    case 'REMOVE_PROJECT': {
      const newList = state.inputList.filter((_, i) => i !== action.index)
      return { ...state, inputList: newList.length > 0 ? newList : [{ project_title: '', project_desc: '' }] }
    }
    case 'SET_EXPERIENCE': {
      const newList = [...state.experience]
      newList[action.index] = { ...newList[action.index], [action.field]: action.value }
      return { ...state, experience: newList }
    }
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, { company: '', role: '', job_desc: '' }] }
    case 'REMOVE_EXPERIENCE': {
      const newList = state.experience.filter((_, i) => i !== action.index)
      return { ...state, experience: newList.length > 0 ? newList : [{ company: '', role: '', job_desc: '' }] }
    }
    case 'LOAD_DATA':
      return {
        ...state,
        name: action.data.name || '',
        headline: action.data.headline || '',
        degree: action.data.degree || '',
        college: action.data.college || '',
        email: action.data.email || '',
        tech: action.data.tech || '',
        fileUrl: action.data.fileUrl || null,
        previewUrl: action.data.fileUrl || null,
        filename: action.data.filename || '',
        skills: action.data.skills || '',
        about: action.data.about || '',
        inputList: action.data.inputList || [{ project_title: '', project_desc: '' }],
        experience: action.data.experience || [{ company: '', role: '', job_desc: '' }],
        github: action.data.github || '',
        linkedin: action.data.linkedin || '',
        update: true,
        remove: true,
        portfolio: true,
        submit: false,
      }
    case 'RESET_FORM':
      return initialState
    case 'SET_PREVIEW_URL':
      return { ...state, previewUrl: action.url }
    case 'SET_FILE_URL':
      return { ...state, fileUrl: action.url }
    default:
      return state
  }
}

export const usePortfolioForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const history = useHistory()
  const auth = getAuth()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (!currentUser) {
        history.push('/')
      }
    })
    return () => unsubscribe()
  }, [auth, history])

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.email || ''), (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as UserData
          dispatch({ type: 'LOAD_DATA', data })
        }
      })
      return () => unsubscribe()
    }
  }, [user])

  const handleFileUpload = async (file: File) => {
    const storage = getStorage()
    const filename = file.name
    dispatch({ type: 'SET_FIELD', field: 'filename', value: filename })

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      dispatch({ type: 'SET_PREVIEW_URL', url: reader.result as string })
    }
    reader.readAsDataURL(file)

    const storageRef = ref(storage, filename)
    await uploadBytesResumable(storageRef, file)
    const url = await getDownloadURL(ref(storage, storageRef))
    dispatch({ type: 'SET_FILE_URL', url: url })
    dispatch({ type: 'SET_PREVIEW_URL', url: url })
  }

  const handleSubmit = async () => {
    if (!user?.email) return

    const data: UserData = {
      name: state.name,
      headline: state.headline,
      degree: state.degree,
      college: state.college,
      email: state.email,
      tech: state.tech,
      skills: state.skills,
      fileUrl: state.fileUrl,
      about: state.about,
      inputList: state.inputList,
      experience: state.experience,
      github: state.github,
      linkedin: state.linkedin,
      filename: state.filename,
    }

    try {
      await setDoc(doc(db, 'users', user.email), data)
      dispatch({ type: 'SET_FIELD', field: 'update', value: true })
      dispatch({ type: 'SET_FIELD', field: 'remove', value: true })
      dispatch({ type: 'SET_FIELD', field: 'portfolio', value: true })
      dispatch({ type: 'SET_FIELD', field: 'submit', value: false })
    } catch (error) {
      console.error('Error saving data:', error)
    }
  }

  const handleRemove = async () => {
    if (!user?.email) return

    try {
      await deleteDoc(doc(db, 'users', user.email))
      dispatch({ type: 'RESET_FORM' })
    } catch (error) {
      console.error('Error deleting data:', error)
    }
  }

  return {
    state,
    dispatch,
    user,
    handleFileUpload,
    handleSubmit,
    handleRemove,
  }
}

